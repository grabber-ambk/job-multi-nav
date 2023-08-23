import {
  CREATE_NEW_TASK,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TODO_PRIORITY_LIST,
  GET_TODO_STATUS_LIST,
  UPDATE_TASK_DETAIL,
} from '@crema/actions/Todo.action';
import { appIntl } from '@crema/helpers';
import jwtAxios from '@crema/services/auth/JWT';
import { fetchError, fetchStart, fetchSuccess, showMessage } from './Common';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import { TodoType } from '@crema/models/apps/Todo';

export const onGetCalTaskList = (
  type: string,
  name: string,
  currentPage: number
) => {
  const { messages } = appIntl();
  const page = currentPage ? currentPage : null;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/calendar/task/list', {
        params: {
          type: type,
          name: name,
          page: page,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TASK_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {});
  };
};

export const onGetCalPriorityList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/calendar/priority/list')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_PRIORITY_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onGetCalStatusList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/calendar/status/list')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TODO_STATUS_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onCreateCalTask = (task: TodoType | any) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post('/api/calendar/compose', { task })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_NEW_TASK, payload: data.data });
          dispatch(showMessage(String(messages['task.created'])));
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onGetSelectedCalTask = (id: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get(`/api/calendar/task/`, {
        params: {
          id: id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TASK_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};

export const onUpdateSelectedCalTask = (task: TodoType | any) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put('/api/calendar/task/', { task })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_TASK_DETAIL,
            payload: { data: data.data, task },
          });
          dispatch(
            showMessage(
              task.folderValue === 126
                ? String(messages['task.deleted'])
                : String(messages['task.updated'])
            )
          );
        } else {
          dispatch(fetchError(String(messages['message.somethingWentWrong'])));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(String(messages['message.somethingWentWrong'])));
      });
  };
};
