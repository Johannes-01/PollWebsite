import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.css"

export default function Button({text, onclick, style}) {
    return (
        <div id="button" onClick={onclick} style={style}>
            <p>{text}</p>
        </div>
    );
}