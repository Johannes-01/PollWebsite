import { useNavigate } from "react-router-dom";
import React from "react";
import "./Button.css"
import { useRef } from "react";

export default function Button({text, onclick, style, tabIndex, loading=false}) {

    const buttonRef = useRef();

    const onKeyPress = (e) => {
        e.preventDefault();
        console.log(e)
        if (e.keyCode === 13) {
            buttonRef.current.click();
        }
    };

    return (
        <div id="button" ref={buttonRef} onClick={onclick} style={style} tabIndex={tabIndex} onKeyDown={onKeyPress}>
            {loading ? <div id="loader"></div> : <p>{text}</p>}
        </div>
    );
}