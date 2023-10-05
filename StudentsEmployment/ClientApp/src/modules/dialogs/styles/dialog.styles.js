export default theme => ({
  appBar: {
    position: 'relative',
  },
  dialogToolbar: {
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  field: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(),
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
