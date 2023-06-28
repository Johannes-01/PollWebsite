import { useNavigate } from "react-router-dom";
import React from "react";
import "./Text.css"

export default function Text({id, dispatch, heading, description}) {

    const onChange = (e) => {
        dispatch({id: id, answer: e.target.value});
    };

    return (
        <div id="text">
            <h2>{heading}</h2>
            <p>{description}</p>
            <textarea onChange={onChange}></textarea>
        </div>
    );
}