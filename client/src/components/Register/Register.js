import React, { useState } from 'react';
import { useHistory } from 'react-router';
import User from '../../utils/classUser';
import Notify from '../../utils/notify';
import { checkCharacter, checkValid } from '../../utils/util';
import { isVietnamesePhoneNumber, passValid } from '../../utils/util';
import { CssBaseline, FormHelperText, Paper } from '@material-ui/core/';
import { Container, Button, TextField, Link } from '@material-ui/core/';
import { Typography, FormControl } from '@material-ui/core/';
import useStyles from './style.js';

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [label, setLabel] = useState(new Notify(''));
  const history = useHistory();

  const getUsername = (e) => setUsername(e.target.value);
  const getPhone = (e) => setPhone(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);
  const getConfirmPass = (e) => setConfirmPass(e.target.value);

  const submitRegister = () => {
    if (!checkValid([username, phone, password, confirmPass])) {
      return setLabel(new Notify('Please fill out the form').errorAll());
    } else if (checkCharacter(username)) {
      return setLabel(
        new Notify(
          'User name must contain only letters and numbers'
        ).errorUsername()
      );
    } else if (!isVietnamesePhoneNumber(phone)) {
      return setLabel(new Notify('Invalid phone number').errorPhone());
    } else if (password === confirmPass) {
      if (!passValid(password)) {
        return setLabel(
          new Notify(
            'Password must be at least 8 characters and contain both numbers and uppercase'
          ).errorPassword()
        );
      }
    } else {
      return setLabel(
        new Notify('Password does not match').errorConfirmPass()
      );
    }
    const user = new User(phone, password, username);
    history.push('/verify', { user, phone });
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h4">Sign Up</Typography>
        <FormControl className={classes.form} fullWidth>
          <TextField
            onChange={getUsername}
            value={username}
            error={label.errUsername}
            inputProps={{ maxLength: 15 }}
            variant="outlined"
            margin="normal"
            label="Your name"
            fullWidth
            required
          />
          <TextField
            onChange={getPhone}
            value={phone}
            error={label.errPhone}
            variant="outlined"
            margin="normal"
            label="Phone Number"
            fullWidth
            required
          />
          <TextField
            onChange={getPassword}
            value={password}
            error={label.errPassword}
            variant="outlined"
            margin="normal"
            type="password"
            label="Password"
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
          SIGN UP
        </Button>
        <Typography variant="body2">
          <Link href="/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </Typography>
      </Paper>
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright © Connect Company 2021.
      </Typography>
    </Container>
  );
};

export default Register;
