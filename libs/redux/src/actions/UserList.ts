import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { GET_USER_LIST } from '@crema/actions/UserList.actions';
import jwtAxios from '@crema/services/auth/JWT';
import { appIntl } from '@crema/helpers';

export const onGetUserList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/user/list')
      .then((data: any) => {
        console.log('data:', data);
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};
