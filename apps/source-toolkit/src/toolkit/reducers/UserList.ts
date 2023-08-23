import { GET_USER_LIST } from '@crema/constants/ActionTypes';
import { UserListProps } from '@crema/models/Apps';
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState: {
  usersList: UserListProps[];
} = {
  usersList: [],
};

export const GetUserListAction = createAction<UserListProps[]>(GET_USER_LIST);

const userListReducer = createReducer(initialState, (builder) => {
  builder.addCase(GetUserListAction, (state, action) => {
    state.usersList = action.payload;
  });
});

export default userListReducer;
