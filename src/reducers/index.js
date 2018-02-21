import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesReducer';
import postReducer from './PostsReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postReducer,
});
