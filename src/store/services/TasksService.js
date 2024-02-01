import { tasksApi } from './apiSingleton.js';

export const TasksAPI = tasksApi.injectEndpoints({
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => ({
        url: '/tasks/',
        method: 'GET',
      }),
    }),
    createTask: builder.query({
      query: task => ({
        url: `/tasks/`,
        method: 'POST',
        body: task,
      }),
    }),
    editTask: builder.query({
      query: task => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
    }),
    deleteTask: builder.query({
      query: id => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetTasksQuery,
  useLazyCreateTaskQuery,
  useLazyEditTaskQuery,
  useLazyDeleteTaskQuery,
} = TasksAPI;
