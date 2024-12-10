import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CandidateManager from './CandidateManager';
import Dashboard from './Dashboard';
import RegisterForm from './Events';
import Login from './Login';
// ... other imports

const Layout = () => {
    return (
        <Router>
            <div>
                {/* Add your navigation here */}
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/RegisterForm" element={<RegisterForm />} />
                    <Route path="/studentsData" element={<CandidateManager />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};

export default Layout;
