import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AddCourses.css'; // import your custom CSS file here
import { customAxios } from '../utils/customAxios';

function AddCourses() {
  const [instructors, setInstructors] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [lectures, setLectures] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [courseDate, setCourseDate] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await customAxios.get('/user/instructors');
      if (data && data.data) {
        setInstructors(data.data);
      }
    };
    fetchInstructors();
  }, []);

  const handleAddCourse = async () => {
    try {
      const data = await customAxios.post('/course/',
        {
          name: courseName,
          level: courseLevel,
          description: courseDescription,
          lectures: lectures,
          instructor: instructorName,
          date: courseDate,
        })
      if (data && data.data) {
        alert('Course added successfully');
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <Container className="mt-5">
      <Row>

        <Col>
          <Card className="add-course-card">
            <Card.Header>Add Course</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    value={courseLevel}
                    onChange={(e) => setCourseLevel(e.target.value)}
                    aria-label="Select course level"
                  >
                    <option value="">Select level</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter course description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </Form.Group>
                {/* <Form.Group controlId="formBasicImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setCourseImage(e.target.value)}
                  />
                </Form.Group> */}
                <Form.Group controlId="formBasicLectures">
                  <Form.Label>Lectures</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of lectures"
                    value={lectures}
                    onChange={(e) => setLectures(e.target.value)}
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
                <Form.Group controlId="formBasicDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter course date"
                    value={courseDate}
                    onChange={(e) => setCourseDate(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleAddCourse}>
                  Add Course
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCourses;
