import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Protect from './components/auth/Protect';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';
import { getUser } from './store/reducers/userSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Auth authRoute="login" />} />
        <Route
          exact
          path="/register"
          render={() => <Auth authRoute="register" />}
        />
        <Route
          exact
          path="/verify"
          render={() => <Auth authRoute="verify" />}
        />
        <Route exact path="/phone" render={() => <Auth authRoute="phone" />} />
        <Route
          exact
          path="/newpassword"
          render={() => <Auth authRoute="newpassword" />}
        />
        <Protect exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;

{
  // import Login from './components/Login/Login';
  // import Register from './components/Register/Register';
  // import Verify from './components/Verify/Verify';
  // import PhoneNumber from './components/Verify/PhoneNumber';
  // import NewPassword from './components/Verify/NewPassword';
  /* <Route exact path="/" component={Home} />
        <Route exact path="/login" render={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/phone" component={PhoneNumber} />
        <Route exact path="/newpassword" component={NewPassword} /> */
}
