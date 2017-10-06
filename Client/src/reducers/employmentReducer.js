import {
  GET_EMPLOYMENT_LIST, SET_EMPLOYMENT_LIST_SORTING,
  GET_EMPLOYMENT_SUGGESTIONS, CLEAR_EMPLOYMENT_SUGGESTIONS,
  GET_EMPLOYMENT_BY_ID,
} from '../actions';

const defaultData = {
  list: {
    data: [],
    info: { limit: 14, page: 0, totalRecord: 0, sorting: [] },
    searchSuggestions: []
  },
  edit: {
    data: {
      id: null,
      specialityId: null,
      entranceYear: null,
      eduFormId: null,
      pgContractStuffs: []
    },
    help: {}
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
  case GET_EMPLOYMENT_SUGGESTIONS: {
    const suggestions = action.data.map((item)=> ({ id: item.id, name: item.id + ', ' +
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
  case GET_EMPLOYMENT_BY_ID: {
    return {
      ...state,
      edit: {
        ...state.edit,
        data: action.data,
      }
    };
  }
  default:
    return state;
  }
}
