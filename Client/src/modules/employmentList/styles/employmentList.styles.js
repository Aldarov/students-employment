export default theme => ({
  autocomplete: {
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
    marginBottom: theme.spacing.unit,
  },
});
