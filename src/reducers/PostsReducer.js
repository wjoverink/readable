import {FETCH_POSTS, GET_POST} from '../actions/types';

export const initialPost = {
  author: "",
  body: "",
  category: "",
  commentCount: 0,
  deleted: false,
  id: "",
  timestamp: "",
  title: "",
  voteScore:0
}

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...action.value];
    case GET_POST:
      //Because of the direct url to get a post i remove the post from the state (direct url state is empty)
      //and add the post to the state
      return state.filter(function(post) {
        return post.id !== action.value.id;
      }).concat([action.value]);
    default:
      return state;
  }
}
