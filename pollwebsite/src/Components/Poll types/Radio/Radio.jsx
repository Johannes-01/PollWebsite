import { useNavigate } from "react-router-dom";
import React from "react";
import "./Radio.css"
import Option from "./Option";

export default function Radio({options}) {
    let current_selected = null;
    const select = (test) => {
        if (test === null) return;
        let element = test.target;
        if (current_selected !== null) {
            current_selected.target.classList.remove("option-chosen");
            current_selected.target.querySelector("#inner-circle").style.display = "none";
        }
        current_selected = test;
        element.classList.add("option-chosen");
        element.querySelector("#inner-circle").style.display = "block";
    };
    let option_list = options.map((option, i) => <Option onClick={select} content={option}></Option>);

    return (
        <div id="radio">
            <h2>Heading</h2>
            <p>maybe optional second text</p>
            <div id="options-wrapper">
                {option_list}
            </div>
        </div>
    );
}