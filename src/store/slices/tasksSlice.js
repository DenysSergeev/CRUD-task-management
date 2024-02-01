import { createSlice } from '@reduxjs/toolkit';
import { TasksAPI } from '../services/TasksService.js';

const initialState = {
  isLoading: true,
  list: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        TasksAPI.endpoints.getTasks.matchFulfilled,
        (state, action) => {
          state.list = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        TasksAPI.endpoints.createTask.matchFulfilled,
        (state, action) => {
          state.list = [...state.list, action.payload];
          state.isLoading = false;
        }
      );
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
