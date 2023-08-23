import {
  ADD_BOARD_LIST,
  ADD_LIST_CARD,
  ADD_NEW_BOARD,
  DELETE_BOARD,
  DELETE_LIST,
  DELETE_LIST_CARD,
  EDIT_BOARD_DETAIL,
  EDIT_BOARD_LIST,
  EDIT_LIST_CARD,
  GET_BOARD_DETAIL,
  GET_BOARDS,
  GET_MEMBER_LIST,
  GET_SCRUM_LABEL_LIST,
} from '@crema/actions/Scrumboard.actions';
import {
  BoardType,
  LabelType,
  MemberType,
} from '@crema/models/apps/ScrumbBoard';
import { createAction } from '@reduxjs/toolkit';

export const GetMemberListAction = createAction<MemberType[]>(GET_MEMBER_LIST);

export const GetScrumLabelAction =
  createAction<LabelType[]>(GET_SCRUM_LABEL_LIST);

export const GetBoardsAction = createAction<BoardType[]>(GET_BOARDS);

export const GetBoardDetailAction = createAction<BoardType>(GET_BOARD_DETAIL);

export const AddNewBoardAction = createAction<BoardType[]>(ADD_NEW_BOARD);

export const EditBoardDetailAction = createAction<BoardType>(EDIT_BOARD_DETAIL);

export const DeleteBoardAction = createAction<number>(DELETE_BOARD);

export const DeleteScrumListAction = createAction<BoardType>(DELETE_LIST);

export const AddBoardListAction = createAction<BoardType>(ADD_BOARD_LIST);

export const EditBoardListAction = createAction<BoardType>(EDIT_BOARD_LIST);

export const AddListCardAction = createAction<BoardType>(ADD_LIST_CARD);

export const EditListCardAction = createAction<BoardType>(EDIT_LIST_CARD);

export const DeleteListCardAction = createAction<BoardType>(DELETE_LIST_CARD);
