import * as Api from '../api';
import { FETCH_POSTS, GET_POST, UPDATE_POST } from './types';

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
