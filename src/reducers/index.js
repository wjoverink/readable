import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesReducer';
import postReducer from './PostsReducer';
import commentsReducer from './CommentsReducer';
import SortReducer from './SortReducer';
import NotificationReducer from './NotificationsReducer';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  categories: categoriesReducer,
  posts: postReducer,
  comments: commentsReducer,
  sort: SortReducer,
  loadingBar: loadingBarReducer,
  notifications: NotificationReducer
});
