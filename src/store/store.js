import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import api from './services/apiSingleton.js';
import tasks from './slices/tasksSlice.js';

const reducers = {
  [api.tasks.reducerPath]: api.tasks.reducer,
  tasks,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.tasks.middleware),
});

export const useTypedDispatch = () => useDispatch();
export const useTypedSelector = useSelector;
