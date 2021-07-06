import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/reducers/userSlice';
import Notify from '../../utils/notify';
import firebase from '../../config/firebase';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, CssBaseline, Paper } from '@material-ui/core/';
import { Button, TextField, Grid } from '@material-ui/core/';
import { Typography, FormControl, FormHelperText } from '@material-ui/core/';
import useStyles from './style.js';
// ✓
const Verify = () => {
  const history = useHistory();
  const state = useLocation().state;
  const [phone, setPhone] = useState(state ? state.phone : '');
  const [user, setUser] = useState('');
  const [code, setCode] = useState('');
  const [label, setLabel] = useState(new Notify('Loading.....').Loading());
  const [timeLeft, setTimeLeft] = useState(60);
  const recaptchaWrapperRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (state === undefined) {
      return history.push('/login');
    } else if (timeLeft === 60) {
      setUpUser();
      onSignInSubmit();
    }
    countdown();
  }, [timeLeft]);
  const classes = useStyles();

  const getCode = (e) => setCode(e.target.value);

  const setUpUser = () => {
    if (state.user) return setUser(state.user);
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          console.log('Captcha Resolved');
        },
      }
    );
  };

  const onSignInSubmit = () => {
    setLabel(new Notify('Loading.....').Loading());
    setUpRecaptcha();
    let phoneNumber = '+84' + parseInt(phone);
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        setLabel(new Notify('OTP has been sent ✓').OTPsent());
        window.confirmationResult = confirmationResult;
        console.log('OTP is sent');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const countdown = () => {
    timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  };

  const resetTimeLeft = () => {
    setTimeLeft(59);
  };

  const sendOtpAgain = () => {
    window.recaptchaVerifier.clear();
    recaptchaWrapperRef.current.innerHTML = `<div style="display: none" id="recaptcha-container"></div>`;
    onSignInSubmit();
    resetTimeLeft();
  };

  const onSubmitOtp = () => {
    let otpInput = code;
    let optConfirm = window.confirmationResult;
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // let userFirebase = result.user; console.log(userFirebase);
        if (user) {
          // Todo: register user here
          dispatch(registerUser(user))
            .then((res) => {
              // k ton tai gia tri success neu loi nen dung .payload
              if (res.payload) {
                return history.replace('/login');
              } else {
                setLabel(new Notify('Registered phone number'));
                setTimeout(() => {
                  history.replace('/register');
                }, 3000);
              }
            })
            .catch((error) => console.log(error));
        } else {
          history.replace('/newpassword', { phone: phone });
        }
        setPhone('');
      })
      .catch(function (error) {
        console.log(error);
        setLabel(new Notify('Wrong OTP entered'));
      });
  };
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h4">Enter the code</Typography>
        <FormControl className={classes.form} fullWidth>
          <TextField
            onChange={getCode}
            value={code}
            error={label.error}
            variant="outlined"
            margin="normal"
            label="Your code"
            fullWidth
            required
          />
          <Grid container>
            <Grid item xs>
              {label.error ? (
                <FormHelperText error={label.error}>
                  {label.message}
                </FormHelperText>
              ) : (
                <FormHelperText
                  className={`${
                    label.loading ? classes.loading : classes.notify
                  }`}
                >
                  {label.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item>
              {timeLeft ? (
                <Typography variant="body2">{timeLeft}s</Typography>
              ) : (
                <Typography
                  onClick={sendOtpAgain}
                  className={classes.sendOtp}
                  variant="body2"
                >
                  Send OTP again
                </Typography>
              )}
            </Grid>
          </Grid>
        </FormControl>
        <Button
          onClick={onSubmitOtp}
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
      <div ref={recaptchaWrapperRef}>
        <div style={{ display: 'none' }} id="recaptcha-container"></div>
      </div>
    </Container>
  );
};

export default Verify;
