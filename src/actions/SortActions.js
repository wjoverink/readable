import { UPDATE_ORDER } from './types';

export const sortAction = order => dispatch =>
    dispatch({
        type:UPDATE_ORDER,
        value:order
      });
