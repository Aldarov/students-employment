import {
  SET_SPECIALITIES_SUGGESTIONS,
  CLEAR_SPECIALITIES_SUGGESTIONS,
  SET_EMPLOYMENT_CONTRACT,
  SET_SCHOOLS_SUGGESTIONS,
  CLEAR_SCHOOLS_SUGGESTIONS,
  SET_ORGANIZATIONS_SUGGESTIONS,
  CLEAR_ORGANIZATIONS_SUGGESTIONS,

  SET_STUDENTS_SELECTION,
  CLEAR_STUDENTS_SELECTION,
  OPEN_STUDENTS_SELECTION,
  CLOSE_STUDENTS_SELECTION
} from '../../constants';

const defaultData = {
  specialitySuggestions: [],
  currentContract: null,
  schoolsSuggestions: [],
  organizationsSuggestions: [],
  studentsSelection: [],
  openedStudentsSelection: false
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_SPECIALITIES_SUGGESTIONS: {
      return {
        ...state,
        specialitySuggestions: action.data
      };
    }
    case CLEAR_SPECIALITIES_SUGGESTIONS:
      return {
        ...state,
        specialitySuggestions: []
      };
    case SET_EMPLOYMENT_CONTRACT:
      return {
        ...state,
        currentContract: {
          ...state.currentContract,
          ...action.data
        }
      };
    case SET_SCHOOLS_SUGGESTIONS:
      return {
        ...state,
        schoolsSuggestions: action.data
      };
    case CLEAR_SCHOOLS_SUGGESTIONS:
      return {
        ...state,
        schoolsSuggestions: []
      };
    case SET_ORGANIZATIONS_SUGGESTIONS:
      return {
        ...state,
        organizationsSuggestions: action.data
      };
    case CLEAR_ORGANIZATIONS_SUGGESTIONS:
      return {
        ...state,
        organizationsSuggestions: []
      };
    case SET_STUDENTS_SELECTION:
      return {
        ...state,
        studentsSelection: action.data
      };
    case CLEAR_STUDENTS_SELECTION:
      return {
        ...state,
        studentsSelection: []
      };
    case OPEN_STUDENTS_SELECTION:
      return {
        ...state,
        openedStudentsSelection: true
      };
    case CLOSE_STUDENTS_SELECTION:
      return {
        ...state,
        openedStudentsSelection: false
      };
    default:
      return state;
  }
}
