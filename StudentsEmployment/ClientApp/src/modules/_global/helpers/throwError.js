export default (result) => {
  if (result && result.status >= 400) throw result;
};
