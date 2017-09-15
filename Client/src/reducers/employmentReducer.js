import {
  GET_EMPLOYMENT_LIST, GET_EMPLOYMENT_SUGGESTIONS, CLEAR_EMPLOYMENT_SUGGESTIONS, SET_EMPLOYMENT_LIST_SORTING
} from '../actions';

const defaultData = {
  list: {
    data : [],
    info: { limit: 0, page: 0, totalRecord: 0, sorting: [] },
    searchSuggestions: []
  }
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
  case GET_EMPLOYMENT_LIST: {
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
  case GET_EMPLOYMENT_SUGGESTIONS: {
    return {
      ...state,
      list: {
        ...state.list,
        searchSuggestions: action.data
      }
    };
  }
  case CLEAR_EMPLOYMENT_SUGGESTIONS:
    return {
      ...state,
      list: {
        ...state.list,
        searchSuggestions: []
      }
    };
  case SET_EMPLOYMENT_LIST_SORTING:
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
  default:
    return state;
  }
}
