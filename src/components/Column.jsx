// Column.js
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import './style.css'
export default function Column({ title, tasks, id, onDeleteTask }) {
  const handleDeleteClick = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    <div className="column">
      <h3>{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
                  >
                    <span>{task.title}</span>
                    <button className="delBtn" onClick={() => handleDeleteClick(task.id)}>Delete</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
