import { GET_EMPLOYMENT_LIST } from '../actions';

const defaultData = {
  list: {
    data : [],
    info: { limit: 0, page: 1, totalRecord: 0 }
  }
};
export default function reducer(state = defaultData, action) {
  switch (action.type) {
  case GET_EMPLOYMENT_LIST:
    return {...state, list: action.data};
  default:
    return state;
  }
}
