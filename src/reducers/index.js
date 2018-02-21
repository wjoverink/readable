import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesReducer';

export default combineReducers({
  categories: categoriesReducer,
});
