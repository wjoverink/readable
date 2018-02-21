import { FETCH_CATEGORIES } from '../actions/types';
import sortBy from 'sort-by'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return [...action.value.categories.sort(sortBy('name'))];
    default:
      return state;
  }
}
