import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

function Login({ setToken }) {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const loginUser = async (details) => {
    try {
      const response = await axios.post('http://localhost:3001/login', details);
      setMessage('User logged in successfully');
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setMessage("Username doesn't exist!");
        } else if (error.response.status === 404) {
          setMessage('Incorrect password!');
        } else {
          setMessage('There was an error logging in the user!');
        }
      } else {
        setMessage('There was an error logging in the user!');
      }
      console.error('There was an error logging in the user!', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser(userDetails);

    setToken(token);
    setMessage("");
  };
  
  return (
    <div className="login-container">
      <div className="login">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            <p>Username</p>
            <input
              type="text"
              name="username"
              className="login-input"
              onChange={handleChange}
              value={userDetails.username}
            />
          </label>
          <label className="login-label">
            <p>Password</p>
            <input
              type="password"
              name="password"
              className="login-input"
              onChange={handleChange}
              value={userDetails.password}
            />
          </label>
          <div>
            <button type="submit" className="login-button">Submit</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
