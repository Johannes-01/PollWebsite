import React from "react";
import "./EditText.css"

export default function EditText({data, callback, id}) {

    const onChange = (e) => {
        data[id] = [1, e.target.value];
        callback({...data});
    };

    return (
        <div id="edittext" className="editable">
            <h2 contentEditable>Heading</h2>
            <p contentEditable>maybe optional second text</p>
            <textarea onChange={onChange}></textarea>
        </div>
    );
}