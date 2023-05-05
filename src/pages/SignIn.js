import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './SignIn.module.css';
import { customAxios } from '../utils/customAxios';
const SignInPage = () => {
  const [email, setEmail] = useState('burhan52@gmail.com');
  const [password, setPassword] = useState('Burhan@52');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await customAxios.post(
      '/user/login', {
      email,
      password,
    });
    if (data && data.data && data.data.access_token) {
      localStorage.setItem('token', data.data.access_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      alert('Login success');
      window.location.href = '/';
    } else {
      alert('Login failed');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={{ span: 4 }}>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <p className="text-center">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
