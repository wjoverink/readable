import * as Api from '../api';
import { FETCH_POSTS, GET_POST, UPDATE_POST, ADD_POST, DELETE_POST} from './types';

export const fetchPosts = () => dispatch =>
  Api.getPosts().then(payload =>
    dispatch({
        type:FETCH_POSTS,
        value:payload
      })
  );

export const getPost = id => dispatch =>
  Api.getPost(id).then(payload =>
    dispatch({
        type:GET_POST,
        value:payload
      })
  );

export const editPost = post => dispatch =>
  Api.editPost(post).then(payload =>
    dispatch({
        type:UPDATE_POST,
        value:payload
      })
  );

export const addPost = post => dispatch =>
  Api.addPost(post).then(payload =>
    dispatch({
        type:ADD_POST,
        value:payload
      })
  );

export const votePost = (id, vote) => dispatch =>
  Api.votePost(id, vote).then(payload =>
    dispatch({
        type:UPDATE_POST,
        value:payload
      })
);

export const deletePost = post => dispatch =>
  Api.deletePost(post.id).then(res => {
    if (res.status === 200) {
      dispatch({
        type: DELETE_POST,
        value: post
      });
    }
  });
