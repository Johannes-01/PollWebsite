import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoffee, faTrash, faXmark, faGripVertical, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";
import { useRef } from "react";

export default function Option({ option, onClick, index, onDelete }) {
    const r = useRef();
    return (
        <Draggable draggableId={option.id} index={index}>
            {(provided, snapshot) => {
                let element = (<div className="edit-option" ref={provided.innerRef} onClick={onClick} {...provided.draggableProps}>
                    <div ref={r} className={"editable"}>
                        <div {...provided.dragHandleProps}>
                            <FontAwesomeIcon className="action" id={"handle"} icon={faGripLines} />
                        </div>
                        <div id="custom-checkbox">
                            <div id="outer-circle">
                                <div id="inner-circle"></div>
                            </div>
                        </div>
                        <p contentEditable>{option.content}</p>
                        <div id="actions">
                            {/*<FontAwesomeIcon icon={faCheck} />*/}
                            <FontAwesomeIcon id="delete" icon={faXmark} onClick={onDelete} /> {/* only show on hover!!!! */}
                        </div>
                        </div>
                    </div>);
                if (r.current !== undefined) {
                    if (snapshot.isDragging) {
                        r.current.classList.add("option-dragging");
                    } else {
                        r.current.classList.remove("option-dragging");
                    }
                }
                return element;
                }
            }
        </Draggable>
    );
}