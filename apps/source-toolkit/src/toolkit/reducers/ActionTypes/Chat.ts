import {
  ADD_NEW_MESSAGE,
  DELETE_MESSAGE,
  DELETE_USER_MESSAGES,
  EDIT_MESSAGE,
  GET_CONNECTIONS_LIST,
  GET_USER_MESSAGES,
  SELECT_USER,
  TOGGLE_CHAT_DRAWER,
} from '@crema/actions/Chat.actions';
import { ConnectionType, MessageObjType } from '@crema/models/apps/Chat';
import { createAction } from '@reduxjs/toolkit';

export const ConnectionListAction =
  createAction<ConnectionType[]>(GET_CONNECTIONS_LIST);

export const ToggleDrawerAction = createAction(TOGGLE_CHAT_DRAWER);

export const GetUserAction = createAction<MessageObjType>(GET_USER_MESSAGES);

export const AddNewAction = createAction<{
  data: {
    connectionData: ConnectionType;
    userMessages: MessageObjType;
  };
}>(ADD_NEW_MESSAGE);

export const EditAction = createAction<{
  data: {
    connectionData: ConnectionType;
    userMessages: MessageObjType;
  };
}>(EDIT_MESSAGE);

export const DeleteAction = createAction<{
  connectionData: ConnectionType;
  userMessages: MessageObjType;
}>(DELETE_MESSAGE);

export const DeleteUserAction =
  createAction<ConnectionType>(DELETE_USER_MESSAGES);

export const SelectAction = createAction<ConnectionType>(SELECT_USER);
