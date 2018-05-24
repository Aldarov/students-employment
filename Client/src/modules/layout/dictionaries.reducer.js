import {
  SET_EDU_FORMS, SET_DIRECTION_TYPES, SET_DISTRIBUTION_TYPES, SET_PROFILES, CLEAR_PROFILES
} from '../../constants';

const defaultData = {
  eduForms: [],
  directionTypes: [],
  distributionTypes: [],
  profiles: [{ id: 0, name: 'Не указана', specialityID: null }]
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
    case SET_PROFILES: {
      return {
        ...state,
        profiles: [...defaultData.profiles, ...action.data]
      };
    }
    case CLEAR_PROFILES: {
      return {
        ...state,
        profiles: defaultData.profiles
      };
    }
    default:
      return state;
  }
}
