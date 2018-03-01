import {
  SET_ORGANIZATION_LIST, SET_ORGANIZATION_LIST_SORTING,
  SET_ORGANIZATION_SUGGESTIONS, CLEAR_ORGANIZATION_SUGGESTIONS,
  SET_ADDRESSES_SUGGESTIONS, CLEAR_ADDRESSES_SUGGESTIONS,
  SET_COUNRIES_SUGGESTIONS, CLEAR_COUNRIES_SUGGESTIONS,
  DELETE_ORGANIZATION
} from '../actions';

const defaultData = {
  list: {
    data: [],
    info: { limit: 10, page: 0, totalRecord: 0, sorting: [] },
    searchSuggestions: []
  },
  edit: {
    addressesSuggestions: [],
    countriesSuggestions: [],
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

    case SET_ADDRESSES_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          addressesSuggestions: action.data
        }
      };
    case CLEAR_ADDRESSES_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          addressesSuggestions: []
        }
      };

    case SET_COUNRIES_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          countriesSuggestions: action.data
        }
      };
    case CLEAR_COUNRIES_SUGGESTIONS:
      return {
        ...state,
        edit: {
          ...state.edit,
          countriesSuggestions: []
        }
      };
    case DELETE_ORGANIZATION: {
      const data = state.list.data.filter(item => item.id != action.data);
      return {
        ...state,
        list: {
          ...state.list,
          data: data,
          info: {
            ...state.list.info,
            totalRecord: state.list.info.totalRecord > 0 ? state.list.info.totalRecord - 1 : 0
          }
        }
      };
    }
    default:
      return state;
  }
}
