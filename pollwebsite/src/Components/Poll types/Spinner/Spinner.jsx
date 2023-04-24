import React from "react";
import "./Spinner.css"
import Option from "./Option";
import { useRef } from "react";

export default function Spinner({options}) {
    const spinnerRef = useRef();

    const click = (obj, index) => {
        let element = obj.target;
        spinnerRef.current.querySelector("#spinner-button span").innerHTML = options[index];
    };

    let options_showing = false;
    const showOptions = () => {
        spinnerRef.current.querySelector("#spinner-options").style.display = "block";
    };
    const hideOptions = () => {
        spinnerRef.current.querySelector("#spinner-options").style.display = "none";
    };
    const buttonClick = () => {
        if (options_showing) {
            hideOptions();
        } else {
            showOptions();
        }
        options_showing = !options_showing;
    };

    let option_list = options.map((option, i) => <Option content={option} onClick={(obj) => {click(obj, i)}}></Option>);

    return (
        <div id="spinner" ref={spinnerRef}>
            <h2>Heading</h2>
            <p>maybe optional second text</p>
            <div id="spinner-button" onClick={buttonClick}>
                <span></span>
                <div id="arrow-down-wrapper">
                    <div id="arrow-down"></div>
                </div>
                <div id="spinner-options">
                    {option_list}
                </div>
            </div>
        </div>
    );
}