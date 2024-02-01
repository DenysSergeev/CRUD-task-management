import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import api from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    api.get('/tasks').then(response => {
      setTasks(response.data);
    });
  }, []);

  const handleTaskAdded = newTask => {
    // Update the state with the new task
    api.get('/tasks').then(response => {
      setTasks(response.data);
    });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <TaskList />
        </Col>
        <Col md={6}>
          <TaskForm onTaskAdded={handleTaskAdded} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
