import {getPostComments} from '../api';
import { FETCH_COMMENTS } from './types';


export const fetchComments = postId => dispatch =>
  getPostComments(postId).then(payload =>
    dispatch({
        type:FETCH_COMMENTS,
        value:{payload, postId},

      })
  );
