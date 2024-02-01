import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useTypedDispatch, useTypedSelector } from './store/store.js';
import { setTasks } from './store/slices/tasksSlice.js';

import {
  useLazyGetTasksQuery,
  useLazyCreateTaskQuery,
  useLazyEditTaskQuery,
  useLazyDeleteTaskQuery,
} from './store/services/TasksService.js';

import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [getTasks] = useLazyGetTasksQuery();
  const [createTask] = useLazyCreateTaskQuery();
  const [editTask] = useLazyEditTaskQuery();
  const [deleteTask] = useLazyDeleteTaskQuery();
  const dispatch = useTypedDispatch();

  const { list } = useTypedSelector(state => state.tasks);

  const initTasks = () => {
    getTasks();
  };

  const updateTask = async editedTask => {
    try {
      const updatedList = structuredClone(list);
      const editedTaskIndex = updatedList.findIndex(
        task => task.id === editedTask.id
      );

      updatedList[editedTaskIndex] = editedTask;

      await editTask(editedTask);
      dispatch(setTasks(updatedList));
    } catch (error) {
      console.log('updateTask error: ', error);
    }
  };

  const removeTask = async taskId => {
    try {
      const updatedTasks = list.filter(task => task.id !== taskId);

      await deleteTask(taskId);
      dispatch(setTasks(updatedTasks));
    } catch (error) {
      console.log('handleDelete error: ', error);
    }
  };

  useEffect(initTasks, []);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <TaskList editTask={updateTask} deleteTask={removeTask} />
        </Col>

        <Col md={6}>
          <TaskForm createTask={createTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
