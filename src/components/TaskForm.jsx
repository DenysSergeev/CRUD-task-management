import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ createTask }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState(new Date());

  const handleSubmit = e => {
    e.preventDefault();

    createTask({ title, status, date });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Add Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formTitle' className='mb-3'>
          <Form.Label>Title</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter task title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formStatus' className='mb-3'>
          <Form.Label>Status</Form.Label>

          <Form.Control
            as='select'
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group
          controlId='formDate'
          className='mb-3'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Form.Label>Date</Form.Label>

          <DatePicker
            selected={date}
            onChange={newDate => setDate(newDate)}
            dateFormat='dd MMM yyyy'
            className='form-control'
          />
        </Form.Group>

        <Button variant='primary' type='submit' style={{ width: '100%' }}>
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
