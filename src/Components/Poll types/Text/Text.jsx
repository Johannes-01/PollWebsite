import { useNavigate } from "react-router-dom";
import React from "react";
import "./Text.css"

export default function Text() {
    return (
        <div id="text">
            <h2>Heading</h2>
            <p>maybe optional second text</p>
            <textarea></textarea>
        </div>
    );
}