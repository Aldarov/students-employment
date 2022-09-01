export default theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(),
  },
  autocomplete: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  date: {
    marginBottom: theme.spacing(2),
    width: 200,
  },
  error: {
    margin: theme.spacing(),
    color: 'red',
    fontWeight: 600,
    display: 'block'
  },
  marginTop: {
    marginTop: theme.spacing(),
  },
  marginBottom: {
    marginBottom: theme.spacing(),
  },
  row: {
    flexDirection: 'row'
  },
  marginRight: {
    marginRight: 20
  }
});
