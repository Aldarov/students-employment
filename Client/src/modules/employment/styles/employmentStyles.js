export default theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit,
  },
  autocomplete: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  textField: {
    marginTop: theme.spacing.unit*2,
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
  },
  error: {
    margin: theme.spacing.unit,
    color: 'red',
    fontWeight: 600,
    display: 'block'
  },
  marginBottom: {
    marginBottom: theme.spacing.unit,
  },
  row: {
    flexDirection: 'row'
  },
  marginRight: {
    marginRight: 20
  }
});
