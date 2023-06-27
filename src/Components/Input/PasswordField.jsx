import "./TextField.css"
import { useState } from "react";

export default function PasswordField({title, onInputChange, style, tabIndex}) {

    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
    }

    return (
        <div id="textfield-wrapper">
            <p>{title}</p>
            <input style={style} type="password" value={inputValue} onChange={handleInputChange} tabIndex={tabIndex}></input>
        </div>
    );
}