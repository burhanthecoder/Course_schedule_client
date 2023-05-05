import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { customAxios } from '../utils/customAxios';
function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await customAxios.post(
      '/user/register', {
      name,
      email,
      password,
      role,
    });
    if (data && data.data && data.data.access_token) {
      localStorage.setItem('token', data.data.access_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      alert('Sign Up success');
    } else {
      alert('Sign Up failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center my-4">Sign Up</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            {/*  set role dropdown  with 2 options  admin and instructor */}
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </Form.Control>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg" disabled={!(name && email && password && confirmPassword && role)}>
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
