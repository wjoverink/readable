import { FETCH_COMMENTS, UPDATE_COMMENT, ADD_COMMENT } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
     return {
        ...state,
        [action.value.postId]: action.value.payload
      };
    case ADD_COMMENT:
      return{
        ...state,
        [action.value.parentId]: [
          ...state[action.value.parentId],
          action.value
        ]
      }
    case UPDATE_COMMENT:

      return {
        ...state,
       [action.value.parentId]: state[action.value.parentId].map(
         comment =>
           action.value.id === comment.id ? action.value : comment
       )
         // [action.value.parentId]: {
         //   ...state[action.value.parentId],
         //   [action.payload.id] : action.payload
         // }

       };
    default:
      return state;
  }
}
