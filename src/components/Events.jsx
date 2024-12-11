// src/RegisterForm.js
import React, { useState } from 'react';
import { db } from '../firebase';  // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore';  // Import functions for Firestore
import Dashboard from './Dashboard';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    mobile: '',
    collegeName: '',
    graduation: '',
    stream: '',
    yearPassedOut: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new candidate data object to be saved in Firestore
    const candidateData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      mobile: formData.mobile,
      collegeName: formData.collegeName,
      graduation: formData.graduation,
      stream: formData.stream,
      yearPassedOut: formData.yearPassedOut,
    };

    try {
      // Add candidate data to Firestore under the 'candidates' collection
      const docRef = await addDoc(collection(db, 'candidates'), candidateData);
      alert('User registered successfully!');

      // Reset form data after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        gender: '',
        mobile: '',
        collegeName: '',
        graduation: '',
        stream: '',
        yearPassedOut: '',
      });
    } catch (error) {
      alert('Error registering user: ' + error.message);
    }
  };

  return (
    <div className="register-form">
      <Dashboard />
      <h2>Internship Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            onChange={handleInputChange}
            checked={formData.gender === 'Male'}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onChange={handleInputChange}
            checked={formData.gender === 'Female'}
          />
          <label htmlFor="female">Female</label>
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* College Name */}
        <div>
          <label htmlFor="collegeName">College Name:</label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Graduation (Dropdown) */}
        <div>
          <label htmlFor="graduation">Graduation:</label>
          <select
            id="graduation"
            name="graduation"
            value={formData.graduation}
            onChange={handleInputChange}
            required
          >
            <option value="BTech">B.Tech</option>
            <option value="Degree">Degree</option>
            <option value="BE">B.E</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        {/* Stream (Dropdown) */}
        <div>
          <label htmlFor="stream">Stream/Batch:</label>
          <select
            id="stream"
            name="stream"
            value={formData.stream}
            onChange={handleInputChange}
            required
          >
            <option value="CSE">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics and Communication</option>
            {/* Add other branches here */}
          </select>
        </div>

        {/* Year of Passing */}
        <div>
          <label htmlFor="yearPassedOut">Year of Passed Out:</label>
          <select
            id="yearPassedOut"
            name="yearPassedOut"
            value={formData.yearPassedOut}
            onChange={handleInputChange}
            required
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
