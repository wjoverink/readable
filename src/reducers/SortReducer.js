import { UPDATE_ORDER } from '../actions/types';
import { DEFAULTORDER } from '../utils/config';

export default function(state = DEFAULTORDER, action) {
  switch (action.type) {
    case UPDATE_ORDER:
      return action.value;
    default:
      return state;
  }
}
