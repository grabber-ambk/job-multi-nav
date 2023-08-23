import { cartItems } from '@crema/fakedb/data';
import { createReducer } from '@reduxjs/toolkit';
import {
  CartItemsType,
  CustomersDataType,
  FilterDataType,
  ProductDataType,
  RecentOrdersType,
} from '@crema/models/ecommerce/EcommerceApp';
import {
  AddCartAction,
  AddProdDataAction,
  GetCustomerAction,
  GetEcomListAction,
  GetRecentOrderAction,
  RemoveCartAction,
  SetFilterViewAction,
  SetProdDataAction,
  SetProdViewAction,
  UpdateCartItemAction,
  UpdateProdDataAction,
} from './ActionTypes/Ecommerce';

export const VIEW_TYPE = Object.freeze({ LIST: 1, GRID: 2 });
const initialState: {
  ecommerceList: {
    list: ProductDataType[];
    total: number;
  };
  viewType: number;
  currentProduct: ProductDataType | null;
  orderCount: number;
  filterData: FilterDataType;
  cartItems: CartItemsType[];
  recentOrders: RecentOrdersType[];
  customers: CustomersDataType[];
  customerCount: number;
} = {
  ecommerceList: { list: [], total: 0 },
  viewType: VIEW_TYPE.LIST,
  currentProduct: null,
  orderCount: 0,
  filterData: {
    title: '',
    brand: [],
    ideaFor: [],
    discount: [],
    color: [],
    rating: [],
  },
  cartItems: cartItems,
  recentOrders: [],
  customers: [],
  customerCount: 0,
};

const ecommerceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetEcomListAction, (state, action) => {
      state.ecommerceList = action.payload;
    })
    .addCase(SetProdViewAction, (state, action) => {
      state.viewType = action.payload;
    })
    .addCase(SetFilterViewAction, (state, action) => {
      state.filterData = action.payload;
    })
    .addCase(SetProdDataAction, (state, action) => {
      state.currentProduct = action.payload;
    })
    .addCase(AddProdDataAction, (state, action) => {
      state.ecommerceList = action.payload;
    })
    .addCase(UpdateProdDataAction, (state, action) => {
      state.ecommerceList = action.payload;
    })
    .addCase(GetRecentOrderAction, (state, action) => {
      state.recentOrders = action.payload.data;
      state.orderCount = action.payload.count;
    })
    // .addCase(SET_CART_ITEMS, (state, action) => {
    //   state.cartItems = action.payload;
    // })
    .addCase(UpdateCartItemAction, (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    })
    .addCase(AddCartAction, (state, action) => {
      let cartItems = [];
      if (state.cartItems.some((item) => +item.id === +action.payload.id)) {
        cartItems = state.cartItems.map((item) => {
          if (+item.id === +action.payload.id) {
            item.count = +item.count + 1;
          }
          return item;
        });
        state.cartItems = cartItems;
      } else {
        cartItems = state.cartItems.concat({
          id: action.payload.id,
          title: action.payload.title,
          mrp: action.payload.mrp,
          discount: action.payload.discount,
          brand: action.payload.brand,
          image: action.payload.image,
          count: 1,
        });
        state.cartItems = cartItems;
      }
    })
    .addCase(RemoveCartAction, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    })
    .addCase(GetCustomerAction, (state, action) => {
      state.customers = action.payload.customers;
      state.customerCount = action.payload.customerCount;
    });
});

export default ecommerceReducer;
