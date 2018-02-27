import * as Api from '../api/api';
import {FETCH_POSTS, GET_POST, UPDATE_POST, ADD_POST, DELETE_POST, SHOW_NOTIFICATION} from './types';
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {reduceStringLength} from '../utils/helper'

export const fetchPosts = () => dispatch => {
  dispatch(showLoading())
  Api.getPosts().then(payload => {
    dispatch({type: FETCH_POSTS, value: payload})
    dispatch(hideLoading())
  })
}

export const getPost = id => dispatch => {
  dispatch(showLoading())
  Api.getPost(id).then(payload => {
    dispatch({type: GET_POST, value: payload})
    dispatch(hideLoading())
  })
}

export const addPost = post => dispatch => {
  dispatch(showLoading())
  Api.addPost(post).then(payload => {
    dispatch({type: ADD_POST, value: payload})
    dispatch(hideLoading())
  })
}

export const editPost = post => dispatch => {
  dispatch(showLoading())
  Api.editPost(post).then(payload => {
    dispatch({type: UPDATE_POST, value: payload})
    dispatch(hideLoading())
  })
}

export const votePost = (id, vote) => dispatch => {
  // dispatch(showLoading())
  Api.votePost(id, vote).then(payload => {
    dispatch({type: UPDATE_POST, value: payload})
    // dispatch(hideLoading())
  })
}

export const deletePost = post => dispatch => {
  dispatch(showLoading())
  Api.deletePost(post.id).then(res => {
      if (res.status === 200) {
        dispatch({type: DELETE_POST, value: post})
        dispatch({type: SHOW_NOTIFICATION, value: `Article "${reduceStringLength(post.title, 7)}" deleted`});
    }
    dispatch(hideLoading())
  })
}
