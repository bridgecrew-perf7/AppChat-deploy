import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '450px',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#0068ff',
    '&:hover': {
      backgroundColor: '#004bb9',
    },
  },
  notify: {
    color: '#007bff',
  },
  loading: {
    fontWeight: 'bold',
    clipPath: 'inset(0 100% 0 0)',
    animation: '$c5 2s steps(11) infinite',
  },
  '@keyframes c5': {
    to: { clipPath: 'inset(0 -1ch 0 0)' },
  },
  sendOtp: {
    color: '#3f51b5',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
