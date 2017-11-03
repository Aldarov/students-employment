export const REQUEST_START = 'REQUEST_START';
export const REQUEST_END = 'REQUEST_END';

export function fetchingAction(dispatch, actions) {
  dispatch({ type: REQUEST_START });
  return actions
    .then(() => dispatch({ type: REQUEST_END }))
    .catch(() => dispatch({ type: REQUEST_END }));
}
