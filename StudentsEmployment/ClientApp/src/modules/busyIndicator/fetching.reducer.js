import { FETCHING_START, FETCHING_END } from '../../constants';

export default function reducer(state = {}, action) {
  const formName = action.data;
  switch (action.type) {
    case FETCHING_START: {
      const {[formName]: del, ...st} = state;
      return {
        ...st,
        [formName]: true
      };
    }
    case FETCHING_END: {
      if (formName) {
        const {[formName]: del, ...st} = state;
        return {
          ...st,
          [formName]: false
        };
      } else {
        return {};
      }
    }
    default:
      return state;
  }
}
