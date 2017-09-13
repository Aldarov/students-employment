import {
  GET_EMPLOYMENT_LIST, GET_EMPLOYMENT_SUGGESTIONS, CLEAR_EMPLOYMENT_SUGGESTIONS
} from '../actions';

const defaultData = {
  list: {
    data : [],
    info: { limit: 0, page: 1, totalRecord: 0 },
    searchSuggestions: []
  }
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
  case GET_EMPLOYMENT_LIST: {
    const { data, info } = action.data;
    return {...state,
      list: {
        ...state.list,
        data, info
      }
    };
  }
  case GET_EMPLOYMENT_SUGGESTIONS: {
    const suggestions = action.data.data.map((item)=> ({ id: item.id, text: item.id + ', ' +
      item.faculty + ', ' + item.speciality + ', ' + item.entranceYear + ', ' + item.eduForm }));
    return {...state,
      list: {
        ...state.list,
        searchSuggestions: suggestions
      }
    };
  }
  case CLEAR_EMPLOYMENT_SUGGESTIONS:
    return {...state,
      list: {
        ...state.list,
        searchSuggestions: []
      }
    };
  default:
    return state;
  }
}
