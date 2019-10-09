export default theme => ({
  form: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  textField: {
    marginTop: theme.spacing(2),
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  autocomplete: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 600,
    },
    marginTop: theme.spacing(2)
  },
});
