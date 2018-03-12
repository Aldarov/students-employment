import { FETCHING_START, FETCHING_END } from '../../constants';

export default function reducer(state = [], action) {
  switch (action.type) {
    case FETCHING_START: {
      const st = state && state.filter(item => item.type !== action.data);
      return [
        ...st,
        { type: action.data, value: true }
      ];
    }
    case FETCHING_END: {
      if (action.data) {
        const st = state && state.filter(item => item.type !== action.data);
        return [
          ...st,
          { type: action.data, value: false }
        ];
      } else {
        return state.map(item => ({...item, value: false}));
      }
    }
    default:
      return state;
  }
}
