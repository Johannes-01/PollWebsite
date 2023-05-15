import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.css"

export default function Button({text, onclick}) {
    const validateLogin = useNavigate();

    const handleClick = () => {
        validateLogin("/penis");
    };

    return (
        <div id="button" onClick={onclick}>
            <p>{text}</p>
        </div>
    );
}