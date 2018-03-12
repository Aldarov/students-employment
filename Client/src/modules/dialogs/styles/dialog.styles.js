export default theme => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    marginLeft: '-20px'
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  field: {
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  horizontal: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    color: 'white'
  }
});
