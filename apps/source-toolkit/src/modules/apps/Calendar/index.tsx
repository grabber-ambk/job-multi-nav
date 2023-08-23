import React, { useEffect, useState } from 'react';
import TaskSideBar from './TaskSideBar/index';
import TasksList from './TasksList';
import TaskDetail from './TaskDetail';
import { useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetToDoFolderList,
  onGetToDoLabelList,
  onGetToDoPriorityList,
  onGetToDoStaffList,
  onGetToDoStatusList,
} from '../../../toolkit/actions';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

export type FilterProps = {
  status: number[];
  priority: number[];
};
const ToDo = () => {
  const [filterData, setFilterData] = useState<FilterProps>({
    status: [],
    priority: [],
  });

  const dispatch = useAppDispatch();
  const { query } = useRouter();

  useEffect(() => {
    dispatch(onGetToDoLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoPriorityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStaffList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStatusList());
  }, [dispatch]);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['todo.calendarApp'] as string}
      sidebarContent={
        <TaskSideBar filterData={filterData} setFilterData={setFilterData} />
      }
    >
      <TasksList filterData={filterData} />
      <Box
        sx={{
          transition: 'all 0.5s ease',
          transform: 'translateX(100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0,
          visibility: 'hidden',
          backgroundColor: 'background.paper',
          '&.show': {
            transform: 'translateX(0)',
            opacity: 1,
            visibility: 'visible',
          },
        }}
        className={clsx({
          show: query?.all?.length
            ? Number(query.all[query.all.length - 1]) > 0
            : false,
        })}
      >
        <TaskDetail />
      </Box>
    </AppsContainer>
  );
};

export default ToDo;
