import React from 'react';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import { useRouter } from 'next/router';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppsStarredIcon from '@crema/components/AppsStarredIcon';
import StatusToggleButton from './StatusToggleButton';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppTooltip from '@crema/components/AppTooltip';
import { TodoType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoType;
};

const TaskDetailHeader = (props: Props) => {
  const { selectedTask } = props;
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onClickBackButton = () => {
    router.back();
  };

  const onChangeStarred = (checked: boolean) => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, isStarred: checked }));
  };

  const onDeleteTask = () => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, folderValue: 126 }));
    router.back();
  };

  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
        }}
        component="span"
        mr={{ xs: 2, sm: 4 }}
        onClick={onClickBackButton}
      >
        <AppTooltip title={<IntlMessages id="common.back" />}>
          <ArrowBackIcon
            sx={{
              color: 'text.secondary',
            }}
          />
        </AppTooltip>
      </Box>

      <StatusToggleButton selectedTask={selectedTask} />

      <Box
        component="span"
        sx={{
          marginLeft: 'auto',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </Box>

      <AppsDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
        sx={{
          color: 'text.disabled',
        }}
      />
    </>
  );
};

export default TaskDetailHeader;

TaskDetailHeader.propTypes = {
  selectedTask: PropTypes.object.isRequired,
};
