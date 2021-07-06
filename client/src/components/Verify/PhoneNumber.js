import React, { useState } from 'react';
import Notify from '../../utils/notify';
import { useHistory } from 'react-router-dom';
import { isVietnamesePhoneNumber, checkValid } from '../../utils/util';
import { CssBaseline, Paper } from '@material-ui/core/';
import { Container, Button, TextField } from '@material-ui/core/';
import { Typography, FormControl, FormHelperText } from '@material-ui/core/';
import useStyles from './style.js';

const PhoneNumber = () => {
  const classes = useStyles();
  const history = useHistory();
  const [phone, setPhone] = useState('');
  const [label, setLabel] = useState(new Notify(''));

  const getPhone = (e) => setPhone(e.target.value);

  const submitPhone = () => {
    if (!checkValid([phone]))
      return setLabel(new Notify('Please fill out the form'));
    if (isVietnamesePhoneNumber(phone) === true) {
      history.push('/verify', { phone });
      setPhone('');
      setLabel(new Notify(''));
    } else {
      setLabel(new Notify('Incorrect phone number'));
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography variant="h4">Enter your Phone</Typography>
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
          {label.error && (
            <FormHelperText error={label.error}>{label.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          onClick={submitPhone}
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

export default PhoneNumber;
