import React from "react";
import "./Slider.css"
import { useRef } from "react";
import { EditText } from "../../components";

export default function EditSlider({}) {
    const sliderRef = useRef();

    let value = 0;

    const drag = (e) => {
        let slider = sliderRef.current;
        let slider_width = slider.querySelector("#slider-wrapper #bar").clientWidth;
        value += e.movementX;
        value = Math.min(Math.max(value, 0), slider_width);
        let handle = slider.querySelector("#slider-wrapper #bar #bar-handle");
        handle.style.left = value - 4 + "px";
        let progress = slider.querySelector("#slider-wrapper #bar #bar-inner");
        progress.style.width = value + "px";
        let text = slider.querySelector("#slider-wrapper p");
        text.innerHTML = Math.round(value/slider_width*100) + "%";
    };

    const grab = () => {
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", drag);
        });
    };

    return (
        <div id="slider" ref={sliderRef}>
            <h2 contentEditable>Heading</h2>
            <p contentEditable>maybe optional second text</p>
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