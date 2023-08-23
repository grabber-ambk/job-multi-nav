import {
  GET_INVOICE_LIST,
  GET_INVOICE_DETAIL,
  GET_INVOICE_FOLDER_LIST,
  GET_INVOICE_SETTINGS,
  GET_CLIENT_LIST,
  ADD_NEW_CLIENTS,
  UPDATE_CLIENTS,
  ADD_NEW_INVOICE,
  UPDATE_INVOICE_SETTINGS,
  UPDATE_INVOICE,
  GET_CLIENT_DETAIL,
} from '@crema/actions/Invoice.action';
import { appIntl } from '@crema/helpers';
import jwtAxios from '@crema/services/auth/JWT';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import {
  ClientType,
  InvoiceSettingType,
  InvoiceType,
} from '@crema/models/invoice';

export const onGetInvoiceList = ({
  folder,
  page,
}: {
  folder?: string;
  page: number;
}) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/invoice/list', {
        params: { folder, page },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_INVOICE_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetInvoiceFolderList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/invoice/folders/list')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_INVOICE_FOLDER_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetInvoiceSettings = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/invoice/settings')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_INVOICE_SETTINGS, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetClientList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/invoice/clients')
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENT_LIST, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetInvoiceDetail = (id: number) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/invoice/detail', {
        params: {
          id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_INVOICE_DETAIL, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetClientDetail = (id: string) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/clients/detail', {
        params: {
          id,
        },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENT_DETAIL, payload: data.data });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onAddInvoice = (invoice: InvoiceType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .post('/api/invoice/list/add', { invoice })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch({
            type: ADD_NEW_INVOICE,
            payload: data.data,
          });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onAddClient = (client: ClientType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .post('/api/invoice/clients/add', { client })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch({
            type: ADD_NEW_CLIENTS,
            payload: data.data,
          });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateInvoice = (invoice: InvoiceType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .put('/api/invoice/list/update', { invoice })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_INVOICE,
            payload: data.data,
          });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateClient = (client: ClientType) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .put('/api/invoice/clients/update', { client })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_CLIENTS,
            payload: data.data,
          });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateSettings = (settings: Partial<InvoiceSettingType>) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    jwtAxios
      .put('/api/invoice/settings/update', settings)
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_INVOICE_SETTINGS,
            payload: data.data,
          });
        } else {
          dispatch(
            fetchError(messages['message.somethingWentWrong'] as string)
          );
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
