import { useState } from "react";
import { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Radio, Text, Slider } from "../Components/components";
import "../style/take.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";
import { setCookie } from "./Login";

export default function Take() {
    const endpoint = "185.84.80.172:7085"

    const [questions, setQuestions] = useState(Array.from([]));
    const [questionData, setQuestionData] = useState({});
    const reducer = (state, action) => {
        questionData[action.id] = action.answer;
        setQuestionData(questionData);
        console.log(questionData);
    };
    const [reducerState, dispatch] = useReducer(reducer, {});

    const navigate = useNavigate();

    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");

    // read poll data passed by the login page
    const { state } = useLocation();
    const { pollId } = state;

    // query the respective poll
    const queryPoll = async () => {
        let resp = null;
        try {
            resp = await fetch("https://" + endpoint + "/polls/" + pollId, {
                method: "get",
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

        // if the request does not succeed, redirect to the home page
        if (resp.status !== 200) {
            alert(resp.status + ": " + resp.statusText)
            navigate("/");
        }

        // got poll, so read it
        resp.json().then(v => {
            console.log(v)
            setHeading(v["title"])
            setDescription(v["description"])
        });

        // and query the respective questions for the poll
        resp = null;
        try {
            resp = await fetch("https://" + endpoint + "/polls/" + pollId + "/questions", {
                method: "get",
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

        // got the questions, so read them
        resp.json().then(async v => {
            for (let i = 0; i < v.length; i++) {
                let question = v[i];
                switch (question.questionType) {
                    case 0:
                        // slider
                        setQuestions(oldQuestions => [...oldQuestions, {
                            heading: question.heading,
                            description: question.description,
                            id: question.questionID,
                            type: question.questionType,
                        }])
                        break;
                    case 1:
                        // Text
                        setQuestions(oldQuestions => [...oldQuestions, {
                            heading: question.heading,
                            description: question.description,
                            id: question.questionID,
                            type: question.questionType,
                        }])
                        break;
                    case 2:
                        // radio
                        // we have to query the options first
                        let resp = null;
                        try {
                            resp = await fetch("https://" + endpoint + "/question/" + question.questionID + "/questionOptions", {
                                method: "post",
                                headers: {
                                    "content-type": "application/json",
                                    "accept": "*/*",
                                },
                                credentials: "include",
                            });
                        } catch (error) {
                            console.error(error);
                            break;
                        }

                        // now that we have the options, we can add the question
                        resp.json().then(v => {
                            console.log(v);
                        })
                        break;
                    default:
                        break;
                }
            }
        })
    }

    // only query the questions when there are no questions loaded.
    // otherwise the same questions would be added on every state change
    useEffect(() => {
        queryPoll();
    }, []);

    const submit = () => {
        let err = null;
        questions.forEach(async (v, i) => {
            let answeredQuestion = questionData[i];
            console.log(answeredQuestion);
            try {
                await fetch("https://" + endpoint + "/question/" + v.questionID + "/takequestion", {
                    method: "post",
                    headers: {
                        "content-type": "application/json",
                        "accept": "*/*",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        "value": String(answeredQuestion),
                    }),
                });
            } catch (error) {
                console.error(error);
                err = error;
                return;
            }
        });
        if (err === null) {
            navigate("/");
        } else {
            alert(err);
        }
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

    const cancel = () => {
        navigate(-1);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div id="poll-root">
            <div style={{ "height": "100%", "flex": "0.5 1" }}>
                <div style={{ "padding": "15px", "display": "flex", "justifyContent": "start" }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ "width": "30px", "height": "30px", "cursor": "pointer", "color": "rgb(104, 111, 119)" }} onClick={goBack} />
                </div>
            </div>
            <div id="poll-wrapper">
                <div id="backbutton"></div>
                <h1>{heading}</h1>
                <p>{description}</p>
                <div id="poll-inner">
                    {questions.map((question, index) => {
                        switch (question.type) {
                            case 0:
                                return <Slider id={index} dispatch={dispatch} heading={question.heading} description={question.description} />
                            case 1:
                                return <Text id={index} dispatch={dispatch} heading={question.heading} description={question.description} />;
                            case 2:
                                return <Radio id={index} dispatch={dispatch} options={["placeholder"]} heading={question.heading} description={question.description} />;
                            default:
                                return <p>sth went wrong</p>;
                        }
                    })}
                </div>
                <div id="ending">
                    <Button text={"submit"} onclick={submit}></Button>
                    <Button text={"cancel"} onclick={cancel} style={{ "background": "var(--grey1)" }}></Button>
                </div>
            </div>
            <div style={{ "height": "100%", "flex": "0.5 1" }}>
                <div style={{ "padding": "20px", "display": "flex", "justifyContent": "end" }}>
                    <div style={{ "cursor": "pointer", "display": "flex", "alignItems": "center" }}>
                        <span style={{ "marginRight": "3px", "fontWeight": "bold", "color": "rgb(104, 111, 119)" }} onClick={logout}>Logout</span>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ "width": "30px", "height": "20px", "color": "#686f77" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};