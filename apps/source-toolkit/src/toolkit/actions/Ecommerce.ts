import {
  ADD_CART_ITEM,
  GET_CUSTOMERS,
  GET_ECOMMERCE_LIST,
  GET_RECENT_ORDER,
  REMOVE_CART_ITEM,
  SET_FILTER_DATA,
  SET_PRODUCT_DATA,
  SET_PRODUCT_VIEW_TYPE,
  UPDATE_CART_ITEM,
  ADD_PRODUCT_ITEM,
  UPDATE_PRODUCT_ITEM,
} from '@crema/actions/Ecommerce.action';
import jwtAxios from '@crema/services/auth/JWT';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { Dispatch } from 'redux';
import { AppActions } from '@crema/actions';
import {
  CartItemsType,
  FilterDataType,
  FilterType,
  ProductCartItemsType,
  ProductDataType,
  VIEW_TYPE,
} from '@crema/models/ecommerce/EcommerceApp';

export const onGetEcommerceData = ({
  filterData,
  page,
}: {
  filterData: FilterDataType | FilterType;
  page: number;
}) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/ecommerce/list', {
        params: { filterData, page },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ECOMMERCE_LIST, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const getProductDetail = (id: number | string) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/ecommerce/get', {
        params: { id: id },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_PRODUCT_DATA, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const getRecentOrders = (search: string, page: number) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/ecommerce/orders', {
        params: { search, page },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_RECENT_ORDER, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const getCustomers = (search: string, page: number) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get('/api/ecommerce/customers', {
        params: { search, page },
      })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CUSTOMERS, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const getCartItems = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    //   jwtAxios.get('/api/cart/get')
    //     .then((data:any) => {
    //       if (data.status === 200) {
    dispatch(fetchSuccess());
    //         dispatch({type: SET_CART_ITEMS, payload: data.data});
    //       } else {
    //         dispatch({
    //           type: FETCH_ERROR,
    //           payload: 'Something went wrong, Please try again!',
    //         });
    //       }
    //     })
    //     .catch((error:any) => {
    //         dispatch(fetchError(error.message));
    //     });
  };
};

export const onCreateProduct = (product: ProductDataType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post('/api/ecommerce/list/add', { product })
      .then((data: any) => {
        if (data.status === 200) {
          console.log('onCreateProduct', data.data);
          dispatch(fetchSuccess());
          dispatch({ type: ADD_PRODUCT_ITEM, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdateProduct = (product: ProductDataType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put('/api/ecommerce/list/update', { product })
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_PRODUCT_ITEM, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong, Please try again!'));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const setViewType = (viewType: VIEW_TYPE) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: SET_PRODUCT_VIEW_TYPE, payload: viewType });
  };
};

export const removeCartItem = (data: CartItemsType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: data });
  };
};

export const updateCartItem = (data: CartItemsType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: data });
  };
};

export const addItemToCart = (data: ProductCartItemsType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: ADD_CART_ITEM, payload: data });
  };
};

export const setCurrentProduct = (product: ProductDataType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: SET_PRODUCT_DATA, payload: product });
  };
};

export const setFilters = (filters: any) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: SET_FILTER_DATA, payload: filters });
  };
};
