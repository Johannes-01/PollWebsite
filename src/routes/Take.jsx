import { useState } from "react";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const [state, dispatch] = useReducer(reducer, {});

    const addSlider = () => {
        questions.push(<Slider id={questions.length} dispatch={dispatch} />);
    };
    const addText = () => {
        questions.push(<Text id={questions.length} dispatch={dispatch} />);
    };
    const addRadio = (options) => {
        questions.push(<Radio id={questions.length} dispatch={dispatch} options={options}/>);
    };
    addSlider();
    addText();
    addRadio(["1", "2"]);

    const submit = () => {
        let form = {
            "answeredBy": null,
            "answers": questionData,
        };
        console.log(form);
        console.log(JSON.stringify(form, null, 2));
    };

    return (
        <div id="poll-root">
            <div id="poll-wrapper">
                <div id="backbutton"></div>
                <h1>Heading</h1>
                <p>Description</p>
                <div id="poll-inner">
                    {questions}
                </div>
                <div id="ending">
                    <Button text={"submit"} onclick={submit}></Button>
                    <Button text={"cancel"} style={{"background": "var(--grey1)"}}></Button>
                </div>
            </div>
        </div>
    );

    /*return (
        <div id="poll-root">
            <div id="poll-wrapper">
                <div id="backbutton"></div>
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,</p>
                <div id="poll-inner">
                    <Text></Text>
                    <Radio options={["option 1", "option 2", "option 3"]}></Radio>
                    <Slider></Slider>
                    <Spinner options={["option 1", "option 2", "option 3"]}></Spinner>
                </div>
                <div id="ending">
                    <Button text={"submit"}></Button>
                    <Button text={"cancel"} style={{"background": "var(--grey1)"}}></Button>
                </div>
            </div>
        </div>
    );*/
};