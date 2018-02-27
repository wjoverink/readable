import { REMOVE_NOTIFICATION } from './types';

export const removeNotificationAction = (index) => dispatch =>
    dispatch({
        type:REMOVE_NOTIFICATION,
        value:index
      });
