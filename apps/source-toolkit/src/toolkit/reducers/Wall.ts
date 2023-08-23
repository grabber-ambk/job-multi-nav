import { createReducer } from '@reduxjs/toolkit';
import { PostObjType, WallDataType } from '@crema/models/apps/Wall';
import {
  CreateNewPostAction,
  GetFeedPostsAction,
  GetWallDataAction,
  UpdatePostAction,
} from './ActionTypes/Wall';

const initialState: {
  wallData: WallDataType;
  postList: PostObjType[];
} = {
  wallData: {} as WallDataType,
  postList: [],
};
const wallReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetWallDataAction, (state, action) => {
      state.wallData = action.payload;
    })
    .addCase(GetFeedPostsAction, (state, action) => {
      state.postList = action.payload;
    })
    .addCase(CreateNewPostAction, (state, action) => {
      state.postList = action.payload;
    })
    .addCase(UpdatePostAction, (state, action) => {
      state.postList = action.payload;
    });
});

export default wallReducer;
