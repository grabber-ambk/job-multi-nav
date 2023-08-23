import {
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  TOGGLE_APP_DRAWER,
} from '@crema/actions/Common.action';
import { createReducer } from '@reduxjs/toolkit';
import { CommonType } from '@crema/models/Common';
import { FetchErrorAction, ShowMsgAction } from './ActionTypes/Common';

const INIT_STATE: CommonType = {
  error: '',
  loading: true,
  isAppDrawerOpen: false,
  message: '',
};

const commonReducer = createReducer(INIT_STATE, (builder) => {
  builder
    .addCase(FETCH_START, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = true;
    })
    // .addCase(UPDATING_CONTENT, (state, action) => {
    //   state.error = '';
    //   state.message = '';
    //   state.updatingContent = true;
    // })
    .addCase(FETCH_SUCCESS, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = false;
    })
    .addCase(ShowMsgAction, (state, action) => {
      state.error = '';
      state.message = action.payload;
      state.loading = false;
    })
    .addCase(FetchErrorAction, (state, action) => {
      state.error = action.payload;
      state.message = '';
      state.loading = false;
    })
    .addCase(HIDE_MESSAGE, (state, action) => {
      state.error = '';
      state.message = '';
      state.loading = false;
    })
    .addCase(TOGGLE_APP_DRAWER, (state, action) => {
      state.isAppDrawerOpen = !state.isAppDrawerOpen;
    });
});

export default commonReducer;
