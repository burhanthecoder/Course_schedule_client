import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { customAxios } from '../utils/customAxios';


function LecturesList() {
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    const fetchLectures = async () => {
      const data = await customAxios.get('/lecture/');
      if (data && data.data) {
        setLectures(data.data);
      }
    };
    fetchLectures();
  }, []);


  return (
    <div className="container my-4 mt-5">
      <div className="row">
        {
          lectures.map((lecture) => (
            <div className="col-md-6 col-lg-3 mb-4" key={lecture._id}>
              <Card className="h-100">

                <Card.Body>
                  <Card.Title>
                    {
                      lecture.title
                    }
                  </Card.Title>
                  <Card.Text>
                    {
                      lecture.description
                    }
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LecturesList;
