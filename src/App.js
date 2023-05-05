import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Lectures from './pages/Lectures';
import AddLectures from './pages/AddLectures';
import Courses from './pages/Courses';
import AddCourses from './pages/AddCourses';
import MainNavigation from "./components/layout/MainNavigation"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoutes from './components/layout/AdminRoutes';
import ProtectedRoutes from './components/layout/ProtectedRoutes';

function App() {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/lectures' element={
          <ProtectedRoutes>
            <Lectures />
          </ProtectedRoutes>
        }
        />
        <Route path='/add-lectures' element={
          <ProtectedRoutes>
            <AdminRoutes>
              <AddLectures />
            </AdminRoutes>
          </ProtectedRoutes>
        } />
        <Route path='/' element={
          <ProtectedRoutes>
            <AdminRoutes>
              <Courses />
            </AdminRoutes>
          </ProtectedRoutes>
        } />
        <Route path='/add-courses' element={
          <ProtectedRoutes>
            <AdminRoutes>
              <AddCourses />
            </AdminRoutes>
          </ProtectedRoutes>
        } />
      </Routes>
    </div >
  );
}

export default App;
