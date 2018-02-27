import { SHOW_NOTIFICATION,REMOVE_NOTIFICATION } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state.concat([action.value]);
    case REMOVE_NOTIFICATION:
      return state.filter((message, i) => i !== action.value);
    default:
      return state;
  }
}
