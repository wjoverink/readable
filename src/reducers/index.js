import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesReducer';
import postReducer from './PostsReducer';
import commentsReducer from './CommentsReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postReducer,
  comments: commentsReducer
});
