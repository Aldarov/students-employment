export default theme => ({
  container: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    fontFamily: ['Roboto','Helvetica', 'sans-serif'],
    fontSize: '1.1em'
  },
  content: {
    padding: theme.spacing.unit,
    marginTop: 64,
    flex: 1,
  },
});
