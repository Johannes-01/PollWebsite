import React from "react";
import "./Slider.css"
import { useRef } from "react";

export default function EditSlider({id, dispatch}) {
    const sliderRef = useRef();
    const headingRef = useRef();
    const descriptionRef = useRef();

    let value = 0;
    /* doesn't work when not being touched once in edit view for some reason */
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

        dispatch({id: id, type: 0, value: [Math.round(value/slider_width*100).toString()], heading: headingRef.current.innerText, description: descriptionRef.current.innerText});
    };

    const grab = () => {
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", drag);
        });
    };

    return (
        <div id="slider" ref={sliderRef} className={"editable"}>
            <h2 ref={headingRef} contentEditable>Your Question</h2>
            <p ref={descriptionRef} contentEditable>Optional Text</p>
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