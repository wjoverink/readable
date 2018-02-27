import {getPostComments, voteComment, addComment, editComment, deleteComment} from '../api/api';
import { FETCH_COMMENTS, UPDATE_COMMENT, ADD_COMMENT, DELETE_COMMENT, SHOW_NOTIFICATION} from './types';
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {reduceStringLength} from '../utils/helper'

export const fetchComments = postId => dispatch => {
  dispatch(showLoading())
  getPostComments(postId).then(payload => {
    dispatch({type: FETCH_COMMENTS, value: {payload, postId}})
    dispatch(hideLoading())
  })
}

export const voteComments = (id, vote) => dispatch =>
  voteComment(id, vote).then(payload =>
    dispatch({
        type:UPDATE_COMMENT,
        value:payload
      })
);

export const removeComment = comment => dispatch => {
  dispatch(showLoading())
  deleteComment(comment.id).then(payload => {
    dispatch({type: DELETE_COMMENT, value: comment})
    dispatch({type: SHOW_NOTIFICATION, value: `Comment "${reduceStringLength(comment.body, 7)}" deleted`});
    dispatch(hideLoading())
  })
}

export const changeComment = comment => dispatch => {
  dispatch(showLoading())
  editComment(comment).then(payload => {
    dispatch({type: UPDATE_COMMENT, value: payload})
    dispatch(hideLoading())
  })
}

export const addNewComment = comment => dispatch => {
  dispatch(showLoading())
  addComment(comment).then(payload => {
    dispatch({type: ADD_COMMENT, value: payload})
    dispatch(hideLoading())
  })
}
