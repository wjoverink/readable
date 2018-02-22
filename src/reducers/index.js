import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesReducer';
import postReducer from './PostsReducer';
import commentsReducer from './CommentsReducer';
import SortReducer from './SortReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postReducer,
  comments: commentsReducer,
  sort: SortReducer
});
