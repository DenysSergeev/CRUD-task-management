import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: null,
    title: '',
    status: 'pending',
    date: new Date(),
  });

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    api.get('/tasks').then(response => {
      setTasks(response.data);
    });
  }, []);

  const handleDelete = taskId => {
    // Delete task and update the state
    api.delete(`/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter(task => task.id !== taskId));
    });
  };

  const handleEdit = task => {
    setEditedTask({ ...task, date: new Date(task.date) });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Convert the date to a string before saving
    const editedTaskWithDateString = {
      ...editedTask,
      date: editedTask.date.toISOString(),
    };

    // Update task and close the modal
    api
      .put(`/tasks/${editedTaskWithDateString.id}`, editedTaskWithDateString)
      .then(() => {
        setTasks(
          tasks.map(task =>
            task.id === editedTaskWithDateString.id
              ? editedTaskWithDateString
              : task
          )
        );
        setShowEditModal(false);
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task List</h2>
      <ListGroup style={{ maxWidth: '600px', margin: '0 auto' }}>
        {tasks.map(task => (
          <ListGroup.Item
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              background: '#f8f9fa',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {task.title}
              </div>
              <div>Status: {task.status}</div>
              <div>
                Date:{' '}
                {new Date(task.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div>
              <Button
                variant='info'
                style={{ marginRight: '10px' }}
                onClick={() => handleEdit(task)}
              >
                Edit
              </Button>
              <Button variant='danger' onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              controlId='formEditTitle'
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={editedTask.title}
                onChange={e =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              controlId='formEditStatus'
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <Form.Label>Status</Form.Label>
              <Form.Control
                as='select'
                value={editedTask.status}
                onChange={e =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value='pending'>Pending</option>
                <option value='completed'>Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId='formEditDate'
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <Form.Label>Date</Form.Label>
              <DatePicker
                selected={editedTask.date}
                onChange={newDate =>
                  setEditedTask({ ...editedTask, date: newDate })
                }
                dateFormat='dd MMM yyyy'
                className='form-control'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;
