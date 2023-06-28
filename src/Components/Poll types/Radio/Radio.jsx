import { useNavigate } from "react-router-dom";
import React from "react";
import "./Radio.css"
import Option from "./Option";

export default function Radio({options, id, dispatch, heading, description}) {
    let current_selected = null;
    const select = (obj) => {
        if (obj === null) return;
        let element = obj.target;
        if (current_selected !== null) {
            current_selected.target.classList.remove("option-chosen");
            current_selected.target.querySelector("#inner-circle").style.display = "none";
        }
        current_selected = obj;
        element.classList.add("option-chosen");
        element.querySelector("#inner-circle").style.display = "block";

        dispatch({id: id, answer: current_selected.target.textContent});
    };
    let option_list = options.map((option, i) => <Option onClick={select} content={option}></Option>);

    return (
        <div id="radio">
            <h2>{heading}</h2>
            <p>{description}</p>
            <div id="options-wrapper">
                {option_list}
            </div>
        </div>
    );
}