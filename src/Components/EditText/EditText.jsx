import React from "react";
import { useRef } from "react";
import "./EditText.css"

export default function EditText({id, dispatch}) {

    const headingRef = useRef();
    const descriptionRef = useRef();
    const textareaRef = useRef();

    const onChange = () => {
        dispatch({id: id, type: 1, value: textareaRef.current.value, heading: headingRef.current.innerText, description: descriptionRef.current.innerText});
    };

    return (
        <div id="edittext" className="editable">
            <h2 ref={headingRef} onInput={onChange} contentEditable>Heading</h2>
            <p ref={descriptionRef} onInput={onChange} contentEditable>maybe optional second text</p>
            <textarea onChange={onChange} ref={textareaRef}></textarea>
        </div>
    );
}