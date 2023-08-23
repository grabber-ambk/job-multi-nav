import { createReducer } from '@reduxjs/toolkit';
import {
  FolderType,
  LabelType,
  PriorityType,
  StaffType,
  StatusType,
  TodoType,
} from '@crema/models/apps/Todo';
import {
  CreateTaskAction,
  GetFolderListAction,
  GetTaskAction,
  GetTaskListAction,
  GetTodoLabelAction,
  GetTodoPriorityAction,
  GetTodoStaffAction,
  GetTodoStatusAction,
  TodoToggleDrawerAction,
  UpdateTaskDetailAction,
  UpdateTaskFolderAction,
  UpdateTaskLabelAction,
  UpdateTaskStarredAction,
} from './ActionTypes/Todo';

const initialState: {
  taskList: TodoType[];
  folderList: FolderType[];
  labelList: LabelType[];
  priorityList: PriorityType[];
  statusList: StatusType[];
  staffList: StaffType[];
  totalTasks: number;
  todoDrawer: boolean;
  selectedTask: TodoType | null;
} = {
  taskList: [],
  folderList: [],
  labelList: [],
  priorityList: [],
  statusList: [],
  staffList: [],
  totalTasks: 0,
  todoDrawer: false,
  selectedTask: null,
};

const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetTaskListAction, (state, action) => {
      state.taskList = action.payload.data;
      state.totalTasks = action.payload.count;
    })
    .addCase(GetFolderListAction, (state, action) => {
      state.folderList = action.payload;
    })
    .addCase(TodoToggleDrawerAction, (state, action) => {
      state.todoDrawer = !state.todoDrawer;
    })
    .addCase(GetTodoStatusAction, (state, action) => {
      state.statusList = action.payload;
    })
    .addCase(GetTodoLabelAction, (state, action) => {
      state.labelList = action.payload;
    })
    .addCase(GetTodoStaffAction, (state, action) => {
      state.staffList = action.payload;
    })
    .addCase(GetTodoPriorityAction, (state, action) => {
      state.priorityList = action.payload;
    })
    .addCase(CreateTaskAction, (state, action) => {
      state.taskList = [action.payload, ...state.taskList];
      state.totalTasks = state.totalTasks + 1;
    })
    .addCase(UpdateTaskFolderAction, (state, action) => {
      state.taskList = action.payload.data;
      state.totalTasks = action.payload.count;
    })
    .addCase(UpdateTaskLabelAction, (state, action) => {
      const taskIds = action.payload.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.find(
            (selectedTask) => selectedTask.id === task.id
          );
        } else {
          return task;
        }
      });
      state.taskList = updatedList as TodoType[];
    })
    .addCase(UpdateTaskStarredAction, (state, action) => {
      const taskIds = action.payload.data.map((task) => task.id);
      const updatedList = state.taskList.map((task) => {
        if (taskIds.includes(task.id)) {
          return action.payload.data.find(
            (selectedTask) => selectedTask.id === task.id
          );
        } else {
          return task;
        }
      });
      const filteredList =
        action.payload.folderName === 'starred'
          ? updatedList.filter((item) => item?.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === 'starred'
          ? state.totalTasks - action.payload.data.length
          : state.totalTasks;
      state.taskList = filteredList as TodoType[];
      state.totalTasks = total;
    })
    .addCase(GetTaskAction, (state, action) => {
      state.selectedTask = action.payload;
    })
    .addCase(UpdateTaskDetailAction, (state, action) => {
      state.selectedTask = action.payload.task;
    });
});

export default todoReducer;
