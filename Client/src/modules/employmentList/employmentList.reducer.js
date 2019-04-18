import {
  SET_EMPLOYMENT_LIST,
  SET_EMPLOYMENT_LIST_SORTING,
  DELETE_EMPLOYMENT,

  SET_EMPLOYMENT_SUGGESTIONS,
  CLEAR_EMPLOYMENT_SUGGESTIONS,
} from '../../constants';

const defaultData = {
  data: [],
  info: { limit: 10, page: 0, totalRecord: 0, sorting: [] },
  searchSuggestions: []
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_EMPLOYMENT_LIST: {
      const { data, info } = action.data;
      return {
        ...state,
        data,
        info: {...state.info, ...info}
      };
    }
    case SET_EMPLOYMENT_LIST_SORTING: {
      return {
        ...state,
        info: {
          ...state.info,
          sorting: action.data
        }
      };
    }
    case DELETE_EMPLOYMENT: {
      const data = state.data.filter(item => item.id != action.data);
      return {
        ...state,
        data: data,
        info: {
          ...state.info,
          totalRecord: state.info.totalRecord > 0 ? state.info.totalRecord - 1 : 0
        }
      };
    }
    case SET_EMPLOYMENT_SUGGESTIONS: {
      const suggestions = action.data.map((item) => ({ id: item.id, name: item.id + ', ' +
        item.faculty + ', ' + item.speciality + ', ' + item.entranceYear + ', ' + item.eduForm + ', ' + (item.specialization || '') }));
      return {
        ...state,
        searchSuggestions: suggestions
      };
    }
    case CLEAR_EMPLOYMENT_SUGGESTIONS: {
      return {
        ...state,
        searchSuggestions: []
      };
    }
    default:
      return state;
  }
}
