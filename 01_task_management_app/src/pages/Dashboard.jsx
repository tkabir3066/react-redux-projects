import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  setFilter,
  toggleTask,
} from "../redux/todoSlice";

function Dashboard() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const { tasks, filter } = useSelector((state) => state.todos);
  const handleAddTask = () => {
    if (!task) {
      return;
    } else {
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));
      setTask("");
    }
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  const handleEditTask = (id) => {
    const updatedTask = prompt(
      "Edit your task: ",
      tasks.find((task) => task.id === id)?.text
    );

    if (updatedTask) {
      dispatch(editTask({ id, updatedTask }));
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleFilterChange = (status) => {
    dispatch(setFilter(status));
  };

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "pending") {
      return !task.completed;
    } else {
      return true;
    }
  });
  return (
    <div className="container">
      <h1>Todo Task</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAddTask}>Add Task</button>

      <div className="btn-filter">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
        <button onClick={() => handleFilterChange("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTask.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
            <div>
              <button onClick={() => handleToggleTask(task.id)}>Toggle</button>
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
