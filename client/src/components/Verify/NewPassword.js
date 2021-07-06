import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/reducers/userSlice';
import Notify from '../../utils/notify';
import { checkValid, passValid } from '../../utils/util';
import { Container, CssBaseline, FormHelperText } from '@material-ui/core/';
import { Paper, Button, TextField } from '@material-ui/core/';
import { Typography, FormControl } from '@material-ui/core/';
import useStyles from './style.js';

const NewPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const state = location.state;
  const [phone, setPhone] = useState(state ? state.phone : '');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [label, setLabel] = useState(new Notify(''));

  const dispatch = useDispatch();

  useEffect(() => {
    if (state === undefined) return history.push('/login');
  }, []);
  const classes = useStyles();

  const getPassword = (e) => setPassword(e.target.value);
  const getConfirmPass = (e) => setConfirmPass(e.target.value);

  const submitRegister = () => {
    if (!checkValid([password, confirmPass])) {
      return setLabel(new Notify('Please fill out the form').errorAll());
    } else if (password === confirmPass) {
      if (!passValid(password)) {
        return setLabel(
          new Notify('Password must be at least 8 characters and contain both numbers and uppercase').errorPassword()
        );
      }
    } else {
      return setLabel(
        new Notify('Password does not match').errorConfirmPass()
      );
    }
    const newPassword = password;
    dispatch(forgotPassword({ phone, newPassword }))
      .then((res) => {
        if (res.payload) {
          if (res.payload.success) {
            return history.replace('/login');
          } else {
            setTimeout(() => {
              history.replace('/register');
            }, 3000);
            return setLabel(
              new Notify('Phone number does not exist').errorAll()
            );
          }
        } else {
          return setLabel(new Notify('Invalid password').errorAll());
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h4">Enter New Password</Typography>
        <FormControl className={classes.form} fullWidth>
          <TextField
            onChange={getPassword}
            value={password}
            error={label.errPassword}
            variant="outlined"
            margin="normal"
            type="password"
            label="New password"
            fullWidth
            required
          />
          <TextField
            onChange={getConfirmPass}
            value={confirmPass}
            error={label.errConfirmPass}
            variant="outlined"
            margin="normal"
            type="password"
            label="Confirm password"
            fullWidth
            required
          />
          {label.error && (
            <FormHelperText error={label.error}>{label.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          onClick={submitRegister}
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
        >
          Enter
        </Button>
      </Paper>
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © Connect Company 2021.
      </Typography>
    </Container>
  );
};

export default NewPassword;
