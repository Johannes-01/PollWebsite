import "./TextField.css"
import { useState } from "react";

export default function PasswordField({title, onInputChange}) {

    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
        onInputChange(event.target.value);
    }

    return (
        <div id="textfield-wrapper">
            <p>{title}</p>
            <input type="password" value={inputValue} onChange={handleInputChange}></input>
        </div>
    );
}