import { useNavigate } from "react-router-dom";
import React from "react";
import "./Radio.css"
import Option from "./Option";
import { useState } from "react";

export default function Radio({options, id, dispatch, heading, description}) {
    let [current_selected, setCurrent] = useState(null);
    const select = (obj) => {
        if (obj === null) return;
        let element = obj.target;
        console.log(current_selected)
        if (current_selected !== null) {
            current_selected.target.classList.remove("option-chosen");
            current_selected.target.querySelector("#inner-circle").style.display = "none";
        }
        element.classList.add("option-chosen");
        element.querySelector("#inner-circle").style.display = "block";
        
        setCurrent(obj);
        dispatch({id: id, answer: element.textContent});
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