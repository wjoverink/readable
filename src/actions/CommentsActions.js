import {getPostComments, voteComment, addComment, editComment} from '../api';
import { FETCH_COMMENTS, UPDATE_COMMENT, ADD_COMMENT } from './types';


export const fetchComments = postId => dispatch =>
  getPostComments(postId).then(payload =>
    dispatch({
        type:FETCH_COMMENTS,
        value:{payload, postId},

      })
  );

export const voteComments = (id, vote) => dispatch =>
  voteComment(id, vote).then(payload =>
    dispatch({
        type:UPDATE_COMMENT,
        value:payload
      })
);


export const changeComment = comment => dispatch =>
  editComment(comment).then(payload =>
    dispatch({
        type:UPDATE_COMMENT,
        value:payload
      })
  );

export const addNewComment = comment => dispatch =>
  addComment(comment).then(payload =>
    dispatch({
        type:ADD_COMMENT,
        value:payload
      })
  );
