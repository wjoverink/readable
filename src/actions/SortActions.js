import { UPDATE_ORDER } from './types';

export const sortAction = (order, asc) => dispatch =>
    dispatch({
        type:UPDATE_ORDER,
        value:{name:order, asc:asc}
      });
