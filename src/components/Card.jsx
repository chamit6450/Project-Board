import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ task, index }) {
    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                        <span>
                            <small>
                                {"  "}
                            </small>
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        <div>{task.title}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", padding: 2 }}>
                        
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}
