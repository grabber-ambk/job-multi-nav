import {
  BoardType,
  LabelType,
  MemberType,
} from '@crema/models/apps/ScrumbBoard';
import { createReducer } from '@reduxjs/toolkit';
import {
  AddBoardListAction,
  AddListCardAction,
  AddNewBoardAction,
  DeleteBoardAction,
  DeleteListCardAction,
  DeleteScrumListAction,
  EditBoardDetailAction,
  EditBoardListAction,
  EditListCardAction,
  GetBoardDetailAction,
  GetBoardsAction,
  GetMemberListAction,
  GetScrumLabelAction,
} from './ActionTypes/Scrumboard';

const initialState: {
  boardList: BoardType[];
  labelList: LabelType[];
  memberList: MemberType[];
  boardDetail: BoardType | null;
} = {
  boardList: [],
  labelList: [],
  memberList: [],
  boardDetail: null,
};

const scrumBoardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetMemberListAction, (state, action) => {
      state.memberList = action.payload;
    })
    .addCase(GetScrumLabelAction, (state, action) => {
      state.labelList = action.payload;
    })
    .addCase(GetBoardsAction, (state, action) => {
      state.boardList = action.payload;
    })
    .addCase(GetBoardDetailAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(AddNewBoardAction, (state, action) => {
      state.boardList = state.boardList.concat(action.payload);
    })
    .addCase(EditBoardDetailAction, (state, action) => {
      state.boardList = state.boardList.map((board) =>
        board.id === action.payload.id ? action.payload : board
      );
    })
    .addCase(DeleteBoardAction, (state, action) => {
      state.boardList = state.boardList.filter(
        (board) => board.id !== action.payload
      );
    })
    .addCase(DeleteScrumListAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(AddBoardListAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(EditBoardListAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(AddListCardAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(EditListCardAction, (state, action) => {
      state.boardDetail = action.payload;
    })
    .addCase(DeleteListCardAction, (state, action) => {
      state.boardDetail = action.payload;
    });
});

export default scrumBoardReducer;
