import {
  GET_EDU_FORMS, GET_DIRECTION_TYPES, GET_DISTRIBUTION_TYPES
} from '../actions';

const defaultData = {
  eduForms: [],
  directionTypes: [],
  distributionTypes: []
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case GET_EDU_FORMS: {
      return {
        ...state,
        eduForms: action.data
      };
    }
    case GET_DIRECTION_TYPES: {
      return {
        ...state,
        directionTypes: action.data
      };
    }
    case GET_DISTRIBUTION_TYPES: {
      return {
        ...state,
        distributionTypes: action.data
      };
    }
    default:
      return state;
  }
}
