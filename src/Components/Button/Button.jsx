import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.css"

export default function Button({text, onclick, style, loading=false}) {
    return (
        <div id="button" onClick={onclick} style={style}>
            {loading ? <div id="loader"></div> : <p>{text}</p>}
        </div>
    );
}