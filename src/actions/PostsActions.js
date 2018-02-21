import {getPosts} from '../api';
import { FETCH_POSTS } from './types';

// export const fetchPosts = () => dispatch =>
//   getPosts().then(function(payload){
//     console.log(payload);
//     dispatch({
//         type:FETCH_POSTS,
//         value:payload
//       })
//   }
//   );


export const fetchPosts = () => dispatch =>
  getPosts().then(payload =>
    dispatch({
        type:FETCH_POSTS,
        value:payload
      })
  );
