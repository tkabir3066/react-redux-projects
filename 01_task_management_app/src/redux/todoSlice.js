import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },

    toggleTask(state, action) {
      //   state.tasks[index].text = updatedTask();

      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    editTask(state, action) {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].text = updatedTask;
      }
    },

    deleteTask(state, action) {
      const taskToDelete = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = taskToDelete;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, toggleTask, editTask, deleteTask, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
