import moment from 'moment';

import {
  GET_EMPLOYMENT_BY_ID
} from '../actions';

function DateToRFC3339(date) {
  return new Date(date);//moment(date).toString();//.format('YYYY-MM-DDTHH:mm:ss')+'Z';
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_EMPLOYMENT_BY_ID: {
      return {
        ...state,
        initialValues: {
          ...action.data,
          docDate: action.data.docDate,
        }
      };
    }
    default:
      return state;
  }
}
