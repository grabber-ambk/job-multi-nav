import { createAction } from '@reduxjs/toolkit';
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
import {
  CartItemsType,
  CustomersDataType,
  FilterDataType,
  ProductDataType,
  RecentOrdersType,
} from '@crema/models/ecommerce/EcommerceApp';

export const GetEcomListAction = createAction<{
  list: ProductDataType[];
  total: number;
}>(GET_ECOMMERCE_LIST);

export const SetProdViewAction = createAction<number>(SET_PRODUCT_VIEW_TYPE);

export const SetFilterViewAction =
  createAction<FilterDataType>(SET_FILTER_DATA);

export const SetProdDataAction =
  createAction<ProductDataType>(SET_PRODUCT_DATA);

export const AddProdDataAction = createAction<{
  list: ProductDataType[];
  total: number;
}>(ADD_PRODUCT_ITEM);

export const UpdateProdDataAction = createAction<{
  list: ProductDataType[];
  total: number;
}>(UPDATE_PRODUCT_ITEM);

export const GetRecentOrderAction = createAction<{
  data: RecentOrdersType[];
  count: number;
}>(GET_RECENT_ORDER);

export const UpdateCartItemAction =
  createAction<CartItemsType>(UPDATE_CART_ITEM);

export const AddCartAction = createAction<CartItemsType>(ADD_CART_ITEM);

export const RemoveCartAction = createAction<CartItemsType>(REMOVE_CART_ITEM);

export const GetCustomerAction = createAction<{
  customers: CustomersDataType[];
  customerCount: number;
}>(GET_CUSTOMERS);
