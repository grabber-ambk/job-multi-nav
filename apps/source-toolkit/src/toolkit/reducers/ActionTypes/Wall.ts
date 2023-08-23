import { createAction } from '@reduxjs/toolkit';
import {
  CREATE_NEW_POST,
  GET_FEED_POSTS,
  GET_WALL_DATA,
  UPDATE_POST,
} from '@crema/actions/Wall.actions';
import { PostObjType, WallDataType } from '@crema/models/apps/Wall';

export const GetWallDataAction = createAction<WallDataType>(GET_WALL_DATA);

export const GetFeedPostsAction = createAction<PostObjType[]>(GET_FEED_POSTS);

export const CreateNewPostAction = createAction<PostObjType[]>(CREATE_NEW_POST);

export const UpdatePostAction = createAction<PostObjType[]>(UPDATE_POST);
