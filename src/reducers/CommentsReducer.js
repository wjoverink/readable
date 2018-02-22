import { FETCH_COMMENTS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
     return {
        ...state,
        [action.value.postId]: action.value.payload
      };
    default:
      return state;
  }
}
