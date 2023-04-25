import { Link, useNavigate } from "react-router-dom";
import { Button, Radio, Text, Slider, Spinner, EditSlider } from "../Components/components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../style/create.css"

function Question({question, index}) {
    return (
        <Draggable draggableId={question.id} index={index}>
            {(provided) => {
                return (
                    <div id="slider-edit-wrapper" {...provided.draggableProps} ref={provided.innerRef}>
                        <EditSlider></EditSlider>
                        <div id="slider-edit-draghandle-wrapper">
                            <div id="slider-edit-draghandle" {...provided.dragHandleProps}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default function Create() {

    let objs = {
        "my-task-1": {id: "my-task-1", content: "pen 1"},
        "my-task-2": {id: "my-task-2", content: "pen 2"},
        "my-task-3": {id: "my-task-3", content: "pen 3"},
    };
    let column = {
        id: "my-column-1",
        title: "mein titel",
        ids: ["my-task-1", "my-task-2", "my-task-3"],
    };

    return (
        <div id="create-root">
            <div id="create-wrapper">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,</p>
                <DragDropContext onDragEnd={(result) => {
                    const { destination, source, draggableId } = result;
                    if (!destination) return;
                    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

                    const newOrder = Array.from(column.ids);
                    newOrder.splice(source.index, 1);
                    newOrder.splice(destination.index, 0, draggableId);

                    column.ids = newOrder;
                }}>
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided) => {
                            const questions = column.ids.map(questionId => objs[questionId]);
                            return (<div id="poll-inner" {...provided.droppableProps} ref={provided.innerRef}>
                                {questions.map((v, i) => {return <Question key={v.id} question={v} index={i} />})}
                                {provided.placeholder}
                            </div>);
                        }}
                    </Droppable>
                </DragDropContext>
                <div id="ending">
                    <Button text={"save?"}></Button>
                </div>
            </div>
        </div>
    );
};