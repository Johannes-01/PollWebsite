import React from "react";
import "./EditText.css"
import { useRef } from "react";

export default function EditText({}) {
    return (
        <div id="edittext">
            <input type={"text"} defaultValue={"maybe optional second text"}></input>
        </div>
    );
}