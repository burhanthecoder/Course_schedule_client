import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import './MainNavigation.module.css'

function MainNavigation() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);
  return (
    <>
      <br />
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-3 fixed-top" >
        <Container>
          {
            user &&
            (
              user.role === 'admin' && (
                <Navbar.Brand href="/">Courses</Navbar.Brand>
              )
              || (
                <Navbar.Brand href="/lectures">Lectures</Navbar.Brand>
              )
            ) || (
              <Navbar.Brand href="/signin">Sign In</Navbar.Brand>
            )
          }

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">

            {
              !token && !user && (
                <Nav className="me-auto">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
              ) || (
                <Nav className="me-auto">
                  {
                    user && user.role === 'admin' && (
                      <>
                        <Nav.Link href="/add-courses">Add Courses</Nav.Link>
                        <Nav.Link href="/lectures">Lectures</Nav.Link>
                        <Nav.Link href="/add-lectures">Add Lectures</Nav.Link>
                        <Nav.Link onClick={
                          () => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/signin';
                          }
                        }>Logout</Nav.Link>
                      </>
                    )
                    || (
                      <>
                        <Nav.Link onClick={
                          () => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/signin';
                          }
                        }>Logout</Nav.Link>
                      </>
                    )
                  }


                </Nav>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavigation;
