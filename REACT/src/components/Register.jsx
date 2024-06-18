import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

function Register({ onRegisterSuccess }) {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", userDetails);
      setMessage('User registered successfully');
      onRegisterSuccess();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setMessage('Username is taken.');
        } else if (error.response.status === 404) {
          setMessage('Username and password cannot be empty!');
        }
      } else {
        setMessage('There was an error registering the user.');
      }
      console.error("There was an error registering the user!", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="register-container">
      <div className="register">
        <h1>Please Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">
            <p>Username</p>
            <input
              type="text"
              name="username"
              className="register-input"
              onChange={handleChange}
              value={userDetails.username}
            />
          </label>
          <label className="register-label">
            <p>Password</p>
            <input
              type="password"
              name="password"
              className="register-input"
              onChange={handleChange}
              value={userDetails.password}
            />
          </label>
          <div>
            <button type="submit" className="register-button">Submit</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

Register.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default Register;
