import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const tasksQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
});

const tasksQueryWithRetry = retry(tasksQuery, { maxRetries: 3 });

export const tasksApi = createApi({
  reducerPath: 'TasksAPI',
  baseQuery: tasksQueryWithRetry,
  endpoints: () => ({}),
});

const api = {
  tasks: tasksApi,
};

export default api;
