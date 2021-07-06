import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../Login/Login.js';
import Register from '../Register/Register';
import PhoneNumber from '../Verify/PhoneNumber';
import NewPassword from '../Verify/NewPassword';
import Verify from '../Verify/Verify';

const Auth = ({ authRoute }) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  let body;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    body = (
      <>
        {authRoute === 'login' && <Login />}
        {authRoute === 'register' && <Register />}
        {authRoute === 'verify' && <Verify />}
        {authRoute === 'phone' && <PhoneNumber />}
        {authRoute === 'newpassword' && <NewPassword />}
      </>
    );
  }
  return body;
};

export default Auth;
