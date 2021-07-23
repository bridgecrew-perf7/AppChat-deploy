import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getUser } from '../../store/reducers/userSlice';
import User from '../../utils/classUser';
import Notify from '../../utils/notify';
import { isVietnamesePhoneNumber, checkValid } from '../../utils/util';
import { Container, Grid, Paper } from '@material-ui/core/';
import { Button, TextField, Link } from '@material-ui/core/';
import { Typography, FormControl, FormHelperText } from '@material-ui/core/';
import useStyles from './style.js';

const Login = () => {
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [label, setLabel] = useState(new Notify(''));
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const getPhone = (e) => setPhone(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);

  const submitLogin = () => {
    if (!checkValid([phone, password])) {
      return setLabel(new Notify('Please fill out the form'));
    } else if (isVietnamesePhoneNumber(phone)) {
      let user = new User(phone, password);
      setLoading(true)
      dispatch(loginUser(user))
        .then((res) => {
          if (res.payload) {
            if (res.payload.success) {
              dispatch(getUser());
            } else {
              setLoading(false)
              setLabel(new Notify('Incorrect phone number or password'));
            }
          } else {
            setLoading(false)
            setLabel(new Notify('Incorrect phone number or password'));
          }
        })
        .catch((error) => console.log(error));
    } else {
      setLabel(new Notify('Incorrect phone number or password'));
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h4">Sign In</Typography>
        <FormControl className={classes.form} fullWidth>
          <TextField
            onChange={getPhone}
            value={phone}
            error={label.error}
            variant="outlined"
            margin="normal"
            label="Phone Number"
            placeholder="09xxxxxxxx"
            fullWidth
            required
          />
          <TextField
            onChange={getPassword}
            value={password}
            error={label.error}
            variant="outlined"
            margin="normal"
            type="password"
            label="password"
            fullWidth
            required
          />
          {label.error && (
            <FormHelperText error={label.error}>{label.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          onClick={submitLogin}
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={loading}
          fullWidth
        >
          {loading ? 'SIGN IN...' : 'SIGN IN'}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/phone" variant="body2">
              Forgot password
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              Don't have an account? SignUp
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © Connect Company 2021.
      </Typography>
    </Container>
  );
};

export default Login;
