import { REMOVE_NOTIFICATION } from './types';

export const removeNotificationAction = (message) => dispatch =>
    dispatch({
        type:REMOVE_NOTIFICATION,
        value:message
      });
