import React from 'react';
import './App.css';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Tasks from '../pages/Tasks.jsx';
import UserPage from '../pages/UserPage.jsx';
import OurPlansPage from '../pages/OurPlansPage.jsx';
import { Routes, Route } from 'react-router-dom';
import TaskDetails from '../pages/TaskDetails.jsx'; // Import TaskDetails component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/ourplans" element={<OurPlansPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} /> {/* Use element prop here */}
      </Routes>
    </div>
  );
}

export default App;
