import React, { useEffect, useState } from 'react';
import {
  onGetCalPriorityList,
  onGetCalStatusList,
  onGetCalTaskList,
  onUpdateSelectedCalTask,
} from '../../../../toolkit/actions';
import AddNewTask from '../AddNewTask';
import AppsContent from '@crema/components/AppsContent';
import { TaskCalender } from '@crema/modules/apps/Calendar';
import { useAppDispatch, useAppSelector } from '../../../../toolkit/hooks';
import { FilterProps } from '..';
import { useRouter } from 'next/router';

type Props = {
  filterData: FilterProps;
};

const TasksList = ({ filterData }: Props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { all } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const taskList = useAppSelector(({ calendarApp }) => calendarApp.taskList);

  const [filterText, onSetFilterText] = useState('');

  const [page, setPage] = useState(0);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const getFilterData = () => {
    if (taskList) {
      const data = taskList.filter((task) => {
        let status = true;
        if (filterData.status.length > 0) {
          status = filterData.status.includes(task.status);
        }
        let priority = true;
        if (filterData.priority.length > 0) {
          priority = filterData.priority.includes(task.priority.id);
        }
        return status && priority;
      });
      return {
        data,
        count: data.length,
      };
    }
    return { data: [], count: 0 };
  };

  useEffect(() => {
    setPage(0);
    dispatch(onGetCalPriorityList());
    dispatch(onGetCalStatusList());
    if (folder) dispatch(onGetCalTaskList('folder', folder, page));
    if (label) dispatch(onGetCalTaskList('label', label, page));
  }, [dispatch, page, folder, label]);

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onGetFilteredItems = () => {
    if (!taskList) return [];
    if (filterText === '') {
      return getFilterData().data;
    } else {
      return getFilterData().data.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  const onUpdateTask = (task: object) => {
    dispatch(onUpdateSelectedCalTask(task));
  };
  const list = onGetFilteredItems();

  return (
    <>
      <AppsContent fullView>
        <TaskCalender
          taskList={list}
          onUpdateTask={onUpdateTask}
          onSetFilterText={onSetFilterText}
        />
      </AppsContent>

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
