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
            <h2 ref={headingRef} onInput={onChange} contentEditable>Your Question</h2>
            <p ref={descriptionRef} onInput={onChange} contentEditable>Optional Text</p>
            <textarea onChange={onChange} ref={textareaRef}></textarea>
        </div>
    );
}