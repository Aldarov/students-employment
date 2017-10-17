import { GET_EDU_FORMS } from '../actions';

const defaultData = {
  // specialities: [],
  // schools: [],
  eduForms: [],
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case GET_EDU_FORMS: {
      return {
        ...state,
        eduForms: action.data
      };
    }
    default:
      return state;
  }
}
