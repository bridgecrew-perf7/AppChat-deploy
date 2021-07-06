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
    marginBottom: theme.spacing(3),
  },
  button: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#0068ff',
    '&:hover': {
      backgroundColor: '#004bb9',
    },
  },
}));

export default useStyles;
