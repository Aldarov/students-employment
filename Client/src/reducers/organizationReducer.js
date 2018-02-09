import {
  SET_ORGANIZATION_LIST, SET_ORGANIZATION_LIST_SORTING,
  SET_ORGANIZATION_SUGGESTIONS, CLEAR_ORGANIZATION_SUGGESTIONS
} from '../actions';

const defaultData = {
  list: {
    data: [],
    info: { limit: 10, page: 0, totalRecord: 0, sorting: [] },
    searchSuggestions: []
  },
  edit: {
  }
};

export default function reducer(state = defaultData, action) {
  switch (action.type) {
    case SET_ORGANIZATION_LIST: {
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
    case SET_ORGANIZATION_LIST_SORTING: {
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
    case SET_ORGANIZATION_SUGGESTIONS: {
      const suggestions = action.data.map(item => ({ id: item.id, name: item.name }));
      return {
        ...state,
        list: {
          ...state.list,
          searchSuggestions: suggestions
        }
      };
    }
    case CLEAR_ORGANIZATION_SUGGESTIONS: {
      return {
        ...state,
        list: {
          ...state.list,
          searchSuggestions: []
        }
      };
    }
    default:
      return state;
  }
}
