import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Courses.module.css';
import { customAxios } from '../utils/customAxios';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await customAxios.get('/course/');
      if (data && data.data) {
        setCourses(data.data);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container my-4 mt-5">
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-6 col-lg-3 mb-4" key={course._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  {course.description}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Level: {course.level}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesList;
