import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AddLectures.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { customAxios } from '../utils/customAxios';

function LectureForm() {
  const [title, setTitle] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [description, setDescription] = useState('');
  const [instructorName, setInstructorName] = useState('');
  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await customAxios.get('/user/instructors');
      if (data && data.data) {
        setInstructors(data.data);
      }
    };
    fetchInstructors();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await customAxios.post('/lecture/', {
      title: title,
      description: description,
      instructor: instructorName,
    });
    if (data && data.data) {
      alert('Lecture added successfully');
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.formContainer}>

      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Label as="h2" className="text-center mb-4">Add Lectures</Form.Label>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lecture title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter lecture description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicInstructor">
          <Form.Label>Instructor</Form.Label>
          <Form.Select
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            aria-label="Select instructor name"
          >
            <option value="">Select instructor name</option>
            {instructors.map((instructor) => (
              <option value={instructor._id} key={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LectureForm;
