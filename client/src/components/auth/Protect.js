import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import { useSelector } from 'react-redux';

const Protect = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  return (
    <Route
      render={() =>
        isAuthenticated ? (
          <>
            <Home />
          </>
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};

export default Protect;
