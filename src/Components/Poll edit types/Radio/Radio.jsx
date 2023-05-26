import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./Radio.css"
import Option from "./Option";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function EditRadio({data, callback, id}) {
    let radioRef = useRef();

    const [options, setOptions] = useState([
        {id: "my-id-1", content:"option 1"},
        {id: "my-id-2", content:"option 2"},
        {id: "my-id-3", content:"option 3"},
    ]);

    const add_new_option = () => {
        let options_add = radioRef.current.querySelector("#options-wrapper > .options-add");
        options_add.classList.add("options-add-adding");
    };

    const newOption = () => {
        let c = radioRef.current.querySelector(".options-add > p").innerText;
        let newOptions = Array.from(options);
        newOptions.push({id: c, content: c});
        setOptions(newOptions);

        // passing newOrder here because the options variable isn't updated quick enough
        onChange(newOptions);
    };

    const onChange = (order) => {
        data[id] = [2, Array.from(order.map(v => v.content))];
        callback({...data});
    };

    return (
        <div id="radio" className={"editable"} ref={radioRef}>
            <h2 contentEditable>Heading</h2>
            <p contentEditable>maybe optional second text</p>
            <DragDropContext onDragEnd={(result) => {
                const { destination, source, draggableId } = result;
                if (!destination) return;
                if (destination.droppableId === source.droppableId && destination.index === source.index) return;

                const newOrder = Array.from(options);
                newOrder.splice(source.index, 1);
                newOrder.splice(destination.index, 0, options.find(v => v.id === draggableId));

                setOptions(newOrder);

                // passing newOrder here because the options variable isn't updated quick enough
                onChange(newOrder);
            }}>
                <div id="options-wrapper">
                    <Droppable key={"testcolumn"} droppableId={"testcolumn"}>
                        {(provided) => {
                            return <div ref={provided.innerRef} {...provided.droppableProps}>
                                {options.map((option, i) => {return (<Option key={option.id} option={option} index={i} onDelete={() => {
                                    // this function block has to stay in here, don't know why, but it breaks stuff
                                    // if it is moved!!!
                                    let newOrder = Array.from(options);
                                    newOrder.splice(newOrder.findIndex(v => {return v.id === option.id;}), 1);
                                    setOptions(newOrder);

                                    // passing newOrder here because the options variable isn't updated quick enough
                                    onChange(newOrder);
                                }}></Option>);})}
                                {provided.placeholder}
                                </div>;
                        }}
                    </Droppable>
                    {/* editable option for adding */}
                    <div className="options-add option editable">
                        {/*<div id="custom-checkbox">
                            <div id="outer-circle">
                                <div id="inner-circle"></div>
                            </div>
                    </div>*/}
                        <p onClick={add_new_option} contentEditable>new option</p>
                        <div id="actions">
                            <FontAwesomeIcon id="add" icon={faAdd} onClick={newOption}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}