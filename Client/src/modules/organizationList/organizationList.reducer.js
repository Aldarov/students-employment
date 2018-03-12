import {
  SET_ORGANIZATION_LIST,
  SET_ORGANIZATION_LIST_SORTING,
  DELETE_ORGANIZATION,

  SET_ORGANIZATION_SUGGESTIONS,
  CLEAR_ORGANIZATION_SUGGESTIONS
} from '../../constants';

const defaultData = {
  data: [],
  info: { limit: 10, page: 0, totalRecord: 0, sorting: [] },
  searchSuggestions: []
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_ORGANIZATION_LIST: {
      const { data, info } = action.data;
      return {
        ...state,
        data,
        info: {...state.info, ...info}
      };
    }
    case SET_ORGANIZATION_LIST_SORTING: {
      return {
        ...state,
        info: {
          ...state.info,
          sorting: action.data
        }
      };
    }
    case DELETE_ORGANIZATION: {
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
    case SET_ORGANIZATION_SUGGESTIONS: {
      const suggestions = action.data.map(item => ({ id: item.id, name: item.name }));
      return {
        ...state,
        searchSuggestions: suggestions
      };
    }
    case CLEAR_ORGANIZATION_SUGGESTIONS: {
      return {
        ...state,
        searchSuggestions: []
      };
    }
    default:
      return state;
  }
}
