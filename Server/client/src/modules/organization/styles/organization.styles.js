export default theme => ({
  form: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  textField: {
    marginTop: theme.spacing.unit*2,
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
    marginTop: theme.spacing.unit*2
  },
});
