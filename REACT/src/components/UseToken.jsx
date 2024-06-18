import React, { useState } from 'react';

export default function UseToken() {
  const getToken = () => {
    try {
      const tokenString = sessionStorage.getItem('token');
      const userToken = tokenString ? JSON.parse(tokenString) : null;
      return userToken?.token;
    } catch (error) {
      console.error('Token error:', error);
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  };
}
