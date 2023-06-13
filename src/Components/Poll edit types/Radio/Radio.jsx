import React, { useRef, useState } from "react";
import "./Radio.css"
import Option from "./Option";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function EditRadio({id, dispatch}) {
    let radioRef = useRef();
    const headingRef = useRef();
    const descriptionRef = useRef();

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

    const onOptionTextChange = (id, content) => {
        console.log(id, content);
        options[options.findIndex(v => v.id === id)].content = content
        setOptions(options);
        onChange(options);
    };

    const onChange = (order) => {
        dispatch({id: id, type: 2, value: Array.from(Array.from(order.map(v => v.content))), heading: headingRef.current.innerText, description: descriptionRef.current.innerText});
    };

    return (
        <div id="radio" className={"editable"} ref={radioRef}>
            <h2 ref={headingRef} onInput={() => {onChange(options);}} contentEditable>Heading</h2>
            <p ref={descriptionRef} onInput={() => {onChange(options);}} contentEditable>maybe optional second text</p>
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
                                }} onHighLvlChange={onOptionTextChange}></Option>);})}
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