import { useState } from "react";
import { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Radio, Text, Slider } from "../Components/components";
import "../style/take.css"

export default function Take() {
    let questions = [];
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

    const addSlider = () => {
        questions.push(<Slider id={questions.length} dispatch={dispatch} />);
    };
    const addText = () => {
        questions.push(<Text id={questions.length} dispatch={dispatch} />);
    };
    const addRadio = (options) => {
        questions.push(<Radio id={questions.length} dispatch={dispatch} options={options} />);
    };
    addSlider();
    addText();
    addRadio(["1", "2"]);

    // read poll data passed by the login page
    const { state } = useLocation();
    const { pollId } = state;

    // query the respective poll
    const queryPoll = async () => {
        const endpoint = "185.84.80.172:7085"
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
        resp.json().then(v => {
            console.log(v)
        })
    }
    queryPoll();

    const submit = () => {
        let form = {
            "answeredBy": null,
            "answers": questionData,
        };
        console.log(form);
        console.log(JSON.stringify(form, null, 2));
    };

    const cancel = () => {
        navigate(-1);
    };

    return (
        <div id="poll-root">
            <div id="poll-wrapper">
                <div id="backbutton"></div>
                <h1>{heading}</h1>
                <p>Description</p>
                <div id="poll-inner">
                    {questions}
                </div>
                <div id="ending">
                    <Button text={"submit"} onclick={submit}></Button>
                    <Button text={"cancel"} onclick={cancel} style={{ "background": "var(--grey1)" }}></Button>
                </div>
            </div>
        </div>
    );
};