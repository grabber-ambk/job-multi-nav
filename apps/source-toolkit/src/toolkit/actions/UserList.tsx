import { GET_USER_LIST } from '@crema/constants/ActionTypes';
import { appIntl } from '@crema/helpers';
import jwtAxios from '@crema/services/auth/JWT';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import { fetchError, fetchStart, fetchSuccess } from './Common';

export const onGetUserList = () => {
  return (dispatch: Dispatch<AppActions>) => {
    const { messages } = appIntl();
    dispatch(fetchStart());
    jwtAxios
      .get('/api/user/list')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
