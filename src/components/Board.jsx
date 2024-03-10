import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "./style.css";

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [newTaskTitles, setNewTaskTitles] = useState({
    incomplete: "",
    completed: "",
    inReview: ""
  });

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if (!destination || source.droppableId === destination.droppableId) return;
  
    const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview]);
  
    switch (destination.droppableId) {
      case "1":
        setIncomplete((prevIncomplete) => [...prevIncomplete, { ...task, completed: false }]);
        break;
      case "2":
        setCompleted((prevCompleted) => [...prevCompleted, { ...task, completed: true }]);
        break;
      case "3":
        setInReview((prevInReview) => [...prevInReview, { ...task, completed: false }]);
        break;
      default:
        break;
    }
    deletePreviousState(source.droppableId, draggableId);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete((prevIncomplete) => removeItemById(taskId, prevIncomplete));
        break;
      case "2":
        setCompleted((prevCompleted) => removeItemById(taskId, prevCompleted));
        break;
      case "3":
        setInReview((prevInReview) => removeItemById(taskId, prevInReview));
        break;
      default:
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  const handleNewTaskChange = (e, columnId) => {
    setNewTaskTitles({
      ...newTaskTitles,
      [columnId]: e.target.value
    });
  };

  const handleAddTask = (columnId) => {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitles[columnId],
      completed: false
    };

    switch (columnId) {
      case "incomplete":
        setIncomplete([...incomplete, newTask]);
        break;
      case "completed":
        setCompleted([...completed, newTask]);
        break;
      case "inReview":
        setInReview([...inReview, newTask]);
        break;
      default:
        break;
    }

    setNewTaskTitles({
      ...newTaskTitles,
      [columnId]: ""
    });
  };

  const handleDeleteTask = (taskId) => {
    setCompleted((prevCompleted) => removeItemById(taskId, prevCompleted));
    setIncomplete((prevIncomplete) => removeItemById(taskId, prevIncomplete));
    setInReview((prevInReview) => removeItemById(taskId, prevInReview));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tasks"));
    if (storedData) {
      setCompleted(storedData.completed || []);
      setIncomplete(storedData.incomplete || []);
      setInReview(storedData.inReview || []);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify({ completed, incomplete, inReview })
    );
  }, [completed, incomplete, inReview]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROJECT BOARD</h2>
      <div className="main">

        <div className="notstarted">       
        <Column 
          title={`Not Started (${incomplete.length})`}
          tasks={incomplete}
          id={"1"}
          onDeleteTask={handleDeleteTask}
          
        />
        <div>
          <input className="inp"
            type="text"
            value={newTaskTitles.incomplete}
            onChange={(e) => handleNewTaskChange(e, "incomplete")}
            placeholder="Enter task"
          />
          <button className="btn" onClick={() => handleAddTask("incomplete")}>Add Task</button>
        </div>           
        </div>

        <div className="inprogress">  
        <Column
          title={`In Progress (${completed.length})`}
          tasks={completed}
          id={"2"}
          onDeleteTask={handleDeleteTask}
        />
        <div>
          <input className="inp"
            type="text"
            value={newTaskTitles.completed}
            onChange={(e) => handleNewTaskChange(e, "completed")}
            placeholder="Enter task"
          />
          <button className="btn" onClick={() => handleAddTask("completed")}>Add Task</button>
        </div>
        </div>

        <div className="completed">    
        <Column
          title={`Completed (${inReview.length})`}
          tasks={inReview}
          id={"3"}
          onDeleteTask={handleDeleteTask}
        />
        <div>
          <input className="inp"
            type="text" 
            value={newTaskTitles.inReview}
            onChange={(e) => handleNewTaskChange(e, "inReview")}
            placeholder="Enter task"
          />
          <button className="btn" onClick={() => handleAddTask("inReview")}>Add Task</button>
        </div>
      </div>
      </div>  
    </DragDropContext>
  );
}
