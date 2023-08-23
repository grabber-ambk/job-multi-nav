import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onDeleteSelectedTasks,
  onGetTaskList,
  onUpdateTaskStarredStatus,
} from '../../../../toolkit/actions';
import TaskContentHeader from './TaskContentHeader';
import AddNewTask from '../AddNewTask';
import { Hidden } from '@mui/material';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import AppsFooter from '@crema/components/AppsFooter';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import TodoListSkeleton from '@crema/components/TodoListSkeleton';
import AppList from '@crema/components/AppList';
import {
  TaskCalender,
  TaskListItem,
  TaskListItemMobile,
} from '@crema/modules/apps/ToDo';
import { TodoType } from '@crema/models/apps/Todo';
import { useRouter } from 'next/router';

export const ViewMode = {
  List: 'list',
  Calendar: 'calendar',
};
const TasksList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { all, asPath } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const taskList = useAppSelector(({ todoApp }) => todoApp.taskList);

  const totalTasks = useAppSelector(({ todoApp }) => todoApp.totalTasks);

  const loading = useAppSelector(({ common }) => common.loading);

  const [filterText, onSetFilterText] = useState('');
  const [viewMode, setViewMode] = useState(ViewMode.List);

  const [page, setPage] = useState(0);

  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    if (folder) dispatch(onGetTaskList('folder', folder, page));
    if (label) dispatch(onGetTaskList('label', label, page));
  }, [dispatch, page, folder, label]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    value: number
  ) => {
    setPage(value);
  };

  const onChangeCheckedTasks = (event: any, id: number) => {
    if (event.target.checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onChangeStarred = (checked: boolean, task: TodoType) => {
    if (folder) dispatch(onUpdateTaskStarredStatus([task.id], checked, folder));
    if (label) dispatch(onUpdateTaskStarredStatus([task.id], checked, label));
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return taskList;
    } else {
      return taskList.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };
  const onDeleteTask = (task: TodoType) => {
    if (folder)
      dispatch(onDeleteSelectedTasks([task.id], 'folder', folder, page));
    if (label) dispatch(onDeleteSelectedTasks([task.id], 'label', label, page));
  };

  const list = onGetFilteredItems();

  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          viewMode={viewMode}
          onViewModeSelect={setViewMode}
          onPageChange={onPageChange}
          page={page}
        />
      </AppsHeader>
      <AppsContent>
        {viewMode === ViewMode.Calendar ? (
          <TaskCalender taskList={list} />
        ) : (
          <>
            <Hidden smDown>
              <AppList
                data={list}
                renderRow={(task) => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onChangeCheckedTasks={onChangeCheckedTasks}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                    onDeleteTask={onDeleteTask}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </Hidden>

            <Hidden smUp>
              <AppList
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                data={list}
                renderRow={(task) => (
                  <TaskListItemMobile
                    key={task.id}
                    task={task}
                    checkedTasks={checkedTasks}
                    onChangeStarred={onChangeStarred}
                  />
                )}
                ListEmptyComponent={
                  <ListEmptyResult
                    loading={loading}
                    actionTitle="Add Task"
                    onClick={onOpenAddTask}
                    placeholder={<TodoListSkeleton />}
                  />
                }
              />
            </Hidden>
          </>
        )}
      </AppsContent>

      <Hidden smUp>
        {taskList?.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalTasks}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};

export default TasksList;
