import {getCategories} from '../Api';
import { FETCH_CATEGORIES } from './types';

export const fetchCategories = () => dispatch =>
  getCategories().then(payload =>
    dispatch({
        type:FETCH_CATEGORIES,
        value:payload
      })
  );
