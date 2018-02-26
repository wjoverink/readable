import {getCategories} from '../api/api';
import {FETCH_CATEGORIES} from './types';
import {showLoading, hideLoading} from 'react-redux-loading-bar'

export const fetchCategories = () => dispatch => {
  dispatch(showLoading())
  getCategories().then(payload => {
    dispatch({type: FETCH_CATEGORIES, value: payload})
    dispatch(hideLoading())
  })
}
