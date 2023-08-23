import { ConnectionType, MessageObjType } from '@crema/models/apps/Chat';
import { createReducer } from '@reduxjs/toolkit';
import {
  ConnectionListAction,
  ToggleDrawerAction,
  GetUserAction,
  AddNewAction,
  EditAction,
  DeleteAction,
  DeleteUserAction,
  SelectAction,
} from './ActionTypes/Chat';

const initialState: {
  connectionList: ConnectionType[];
  chatDrawer: boolean;
  userMessages: MessageObjType | null;
  selectedUser: ConnectionType | null;
} = {
  connectionList: [],
  chatDrawer: false,
  userMessages: null,
  selectedUser: null,
};

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ConnectionListAction, (state, action) => {
      state.connectionList = action.payload;
    })
    .addCase(ToggleDrawerAction, (state, action) => {
      state.chatDrawer = !state.chatDrawer;
    })
    .addCase(GetUserAction, (state, action) => {
      state.userMessages = action.payload;
    })
    .addCase(AddNewAction, (state, action) => {
      state.connectionList = state.connectionList.map((item) =>
        item.id === action.payload.data.connectionData.id
          ? action.payload.data.connectionData
          : item
      );
      state.userMessages = action.payload.data.userMessages;
    })
    .addCase(EditAction, (state, action) => {
      state.connectionList = state.connectionList.map((item) =>
        item.id === action.payload.data.connectionData.id
          ? action.payload.data.connectionData
          : item
      );
      state.userMessages = action.payload.data.userMessages;
    })
    .addCase(DeleteAction, (state, action) => {
      state.connectionList = state.connectionList.map((item) =>
        item.id === action.payload.connectionData.id
          ? action.payload.connectionData
          : item
      );
      state.userMessages = action.payload.userMessages;
    })
    .addCase(DeleteUserAction, (state, action) => {
      state.connectionList = state.connectionList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.userMessages = null;
      state.selectedUser = null;
    })
    .addCase(SelectAction, (state, action) => {
      state.selectedUser = action.payload;
      state.userMessages = null;
    });
});

export default chatReducer;
