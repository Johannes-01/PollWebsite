import { Button, EditSlider, EditRadio, EditText } from "../Components/components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../style/create.css"
import { useRef, useState } from "react";
import { useReducer } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

export function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function Question({ question, index, updateCallback }) {
    return (
        <Draggable draggableId={question.id} index={index}>
            {(provided) => {
                return (
                    <div id="slider-edit-wrapper" {...provided.draggableProps} ref={provided.innerRef}>
                        {question.content}
                        <div id="slider-edit-draghandle-wrapper">
                            <div id="slider-edit-draghandle" {...provided.dragHandleProps}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default function Create() {
    const navigate = useNavigate();
    const [questions, set_questions] = useState([]);
    const [column, set_column] = useState([]);
    const [questionData, setQuestionData] = useState({});
    const headingRef = useRef();
    const pollDescriptionRef = useRef();
    const reducer = (state, action) => {
        console.log(state, action);
        questionData[action.id] = Array.from([action.type, action.value, action.heading, action.description]);
        setQuestionData({...questionData});
    };
    const [state, dispatch] = useReducer(reducer, {});
    const endpoint = "185.84.80.172:7085"

    const addSlider = () => {
        let new_id = "id_" + Object.keys(questions).length.toString();
        let element = <EditSlider id={new_id} dispatch={dispatch}/>;
        let new_question = { id: new_id, content: element };
        set_questions([...questions, new_question]);
        set_column([...column, new_id]);
        dispatch({id: new_id, type: 0, value: String(0), heading: "Your Question", description: "Optional Text"})
    };
    const addText = () => {
        let new_id = "id_" + Object.keys(questions).length.toString();
        let element = <EditText id={new_id} dispatch={dispatch}/>;
        let new_question = { id: new_id, content: element };
        set_questions([...questions, new_question]);
        set_column([...column, new_id]);
        dispatch({id: new_id, type: 1, value: "", heading: "Your Question", description: "Optional Text"})
    };
    const addRadio = () => {
        let new_id = "id_" + Object.keys(questions).length.toString();
        let element = <EditRadio id={new_id} dispatch={dispatch}/>;
        let new_question = { id: new_id, content: element };
        set_questions([...questions, new_question]);
        set_column([...column, new_id]);
        dispatch({id: new_id, type: 2, value: Array.from([]), heading: "Your Question", description: "Optional Text"})
    };

    const submit = () => {
        console.log(column);
        console.log(questions)
        console.log(questionData)
        const order = column.map(questionId => {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].id === questionId) {
                    return questions[i];
                }
            }
            return null;
        });
        console.log(order);
        let orderedQuestions = order.map((v, i) => questionData[v.id]);
        console.log(orderedQuestions);
        let form = {
            "title": headingRef.current.innerText,
            "description": pollDescriptionRef.current.innerText,
            "author": 0,
            "startDate": "2023-06-14T06:43:49.022Z",
            "endDate": "2023-07-14T06:43:49.022Z",
            "questions": null,
        };
        form["questions"] = orderedQuestions.map((v, i) => {
            console.log(v);
            return {
                "index": i,
                "type": v[0],
                "heading": v[2],
                "description": v[3],
                "value": v[1],
            }
        });
        console.log(JSON.stringify(form, null, 2));
        console.log("starting request...");
        const response = axios({
            method: 'post',
            url: "https://185.84.80.172:7085/polls/create",
            data: JSON.stringify(form),
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response);
        response.then(v => {
            alert("Your poll has the id: " + v.data.pollID);
        })
        navigate("/");
    };

    const logout = async () => {
        try {
            await fetch("https://" + endpoint + "/logout", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
            return;
        }
        setCookie("isLoggedIn", false, 1);
        navigate("/");
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div id="create-root">
            <div style={{"height": "100%", "flex": "0.5 1"}}>
                <div style={{"padding": "15px", "display": "flex", "justifyContent": "start"}}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{"width": "30px", "height": "30px", "cursor": "pointer", "color": "rgb(104, 111, 119)"}} onClick={goBack}/>
                </div>
            </div>
            <div id="create-wrapper">
                <div id="create-heading" className="editable">
                    <h1 ref={headingRef} contentEditable>Heading</h1>
                    <p ref={pollDescriptionRef} contentEditable>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,</p>
                </div>
                <DragDropContext onDragEnd={(result) => {
                    const { destination, source, draggableId } = result;
                    if (!destination) return;
                    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

                    const newOrder = Array.from(column);
                    newOrder.splice(source.index, 1);
                    newOrder.splice(destination.index, 0, draggableId);

                    set_column(newOrder);
                }}>
                    <Droppable key={"my-column"} droppableId={"my-column"}>
                        {(provided) => {
                            const order = column.map(questionId => {
                                for (let i = 0; i < questions.length; i++) {
                                    if (questions[i].id === questionId) {
                                        return questions[i];
                                    }
                                }
                                return null;
                            });

                            return (<><div id="poll-inner" {...provided.droppableProps} ref={provided.innerRef}>
                                {order.map((v, i) => { return <Question key={v.id} question={v} index={i} />; })}
                                {provided.placeholder}
                                <div id="add-button-wrapper">
                                    <Button text={"Add Slider"} onclick={addSlider} />
                                    <Button text={"Add Multiple choice"} onclick={addRadio} />
                                    <Button text={"Add Edit Text"} onclick={addText} />
                                </div>
                            </div>
                            </>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
                <div id="ending">
                    <Button text={"save"} onclick={submit}></Button>
                </div>
            </div>
            <div style={{"height": "100%", "flex": "0.5 1"}}>
                <div style={{"padding": "20px", "display": "flex", "justifyContent": "end"}}>
                    <div style={{"cursor": "pointer", "display": "flex", "alignItems": "center"}}>
                        <span style={{"marginRight": "3px", "fontWeight": "bold", "color": "rgb(104, 111, 119)"}} onClick={logout}>Logout</span>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{"width": "30px", "height": "20px", "color": "#686f77"}} />
                    </div>
                </div>
            </div>
        </div>
    );
};