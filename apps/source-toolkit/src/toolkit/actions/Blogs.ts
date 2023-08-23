import {
  GET_BLOGS_LIST,
  GET_BLOGS_DETAIL,
  ADD_NEW_BLOG,
  EDIT_BLOG,
} from '@crema/actions/Blogs.action';
import { appIntl } from '@crema/helpers';
import jwtAxios from '@crema/services/auth/JWT';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { BlogContentType } from '@crema/models/extrapages/Blog';

export const getBlogList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/pages/blogs')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_BLOGS_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};
export const getBlogDetail = (id: string) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/pages/blogs/detail', {
        params: {
          id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_BLOGS_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onAddBlog = (blog: BlogContentType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .post('/pages/blogs', { blog })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: ADD_NEW_BLOG,
            payload: data.data,
          });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onEditBlog = (blog: BlogContentType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .put('/pages/blogs', { blog })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: EDIT_BLOG,
            payload: data.data,
          });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};
