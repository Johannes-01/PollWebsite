import React from "react";
import "./Slider.css"

export default function Slider({}) {

    let value = 0;

    const drag = (e) => {
        let slider_width = document.querySelector("#slider-wrapper #bar").clientWidth;
        value += e.movementX;
        value = Math.min(Math.max(value, 0), slider_width);
        let handle = document.querySelector("#slider-wrapper #bar #bar-handle");
        handle.style.left = value - 4 + "px";
        let progress = document.querySelector("#slider-wrapper #bar #bar-inner");
        progress.style.width = value + "px";
        let text = document.querySelector("#slider-wrapper p");
        text.innerHTML = Math.round(value/slider_width*100) + "%";
    };

    const grab = () => {
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", drag);
        });
    };

    return (
        <div id="slider">
            <h2>Heading</h2>
            <p>maybe optional second text</p>
            <div id="slider-wrapper">
                <div id="bar">
                    <div id="bar-inner"></div>
                    <div id="bar-handle" onMouseDown={grab}></div>
                </div>
                <p>0%</p>
            </div>
        </div>
    );
}