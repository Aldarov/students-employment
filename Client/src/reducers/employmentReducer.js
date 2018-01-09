import {
  SET_EMPLOYMENT_LIST, SET_EMPLOYMENT_LIST_SORTING,
  SET_EMPLOYMENT_SUGGESTIONS, CLEAR_EMPLOYMENT_SUGGESTIONS,
  SET_SPECIALITIES_SUGGESTIONS, CLEAR_SPECIALITIES_SUGGESTIONS,
  SET_EMPLOYMENT_CONTRACT, SET_SCHOOLS_SUGGESTIONS, CLEAR_SCHOOLS_SUGGESTIONS,
  SET_ORGANIZATIONS_SUGGESTIONS, CLEAR_ORGANIZATIONS_SUGGESTIONS,
  SET_STUDENTS_SELECTION, CLEAR_STUDENTS_SELECTION,
  OPEN_STUDENTS_SELECTION, CLOSE_STUDENTS_SELECTION,
} from '../actions';

const defaultData = {
  list: {
    data: [],
    info: { limit: 10, page: 0, totalRecord: 0, sorting: [] },
    searchSuggestions: []
  },
  edit: {
    specialitySuggestions: [],
    currentContract: null,
    schoolsSuggestions: [],
    organizationsSuggestions: [],
    studentsSelection: [],
    openedStudentsSelection: false
  }
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_EMPLOYMENT_LIST: {
      const { data, info } = action.data;
      return {
        ...state,
        list: {
          ...state.list,
          data,
          info: {...state.list.info, ...info}
        }
      };
    }
    case SET_EMPLOYMENT_LIST_SORTING: {
      return {
        ...state,
        list: {
          ...state.list,
          info: {
            ...state.list.info,
            sorting: action.data
          }
        }
      };
    }
    case SET_EMPLOYMENT_SUGGESTIONS: {
      const suggestions = action.data.map((item) => ({ id: item.id, name: item.id + ', ' +
        item.faculty + ', ' + item.speciality + ', ' + item.entranceYear + ', ' + item.eduForm }));
      return {
        ...state,
        list: {
          ...state.list,
          searchSuggestions: suggestions
        }
      };
    }
    case CLEAR_EMPLOYMENT_SUGGESTIONS: {
      return {
        ...state,
        list: {
          ...state.list,
          searchSuggestions: []
        }
      };
    }
    case SET_SPECIALITIES_SUGGESTIONS: {
      return {
        ...state,
        edit: {
          ...state.edit,
          specialitySuggestions: action.data
        }
      };
    }
    case CLEAR_SPECIALITIES_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          specialitySuggestions: []
        }
      };
    case SET_EMPLOYMENT_CONTRACT:
      return {
        ...state,
        edit: {
          ...state.edit,
          currentContract: {
            ...state.edit.currentContract,
            ...action.data
          }
        }
      };
    case SET_SCHOOLS_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          schoolsSuggestions: action.data
        }
      };
    case CLEAR_SCHOOLS_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          schoolsSuggestions: []
        }
      };
    case SET_ORGANIZATIONS_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          organizationsSuggestions: action.data
        }
      };
    case CLEAR_ORGANIZATIONS_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          organizationsSuggestions: []
        }
      };
    case SET_STUDENTS_SELECTION:
      return {
        ...state,
        edit: {
          ...state.edit,
          studentsSelection: action.data
        }
      };
    case CLEAR_STUDENTS_SELECTION:
      return {
        ...state,
        edit: {
          ...state.edit,
          studentsSelection: []
        }
      };
    case OPEN_STUDENTS_SELECTION:
      return {
        ...state,
        edit: {
          ...state.edit,
          openedStudentsSelection: true
        }
      };
    case CLOSE_STUDENTS_SELECTION:
      return {
        ...state,
        edit: {
          ...state.edit,
          openedStudentsSelection: false
        }
      };
    default:
      return state;
  }
}
