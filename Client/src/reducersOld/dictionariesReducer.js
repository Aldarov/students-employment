import {
  SET_EDU_FORMS, SET_DIRECTION_TYPES, SET_DISTRIBUTION_TYPES
} from '../actions';

const defaultData = {
  eduForms: [],
  directionTypes: [],
  distributionTypes: []
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_EDU_FORMS: {
      return {
        ...state,
        eduForms: action.data
      };
    }
    case SET_DIRECTION_TYPES: {
      return {
        ...state,
        directionTypes: action.data
      };
    }
    case SET_DISTRIBUTION_TYPES: {
      return {
        ...state,
        distributionTypes: action.data
      };
    }
    default:
      return state;
  }
}
