import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import IntlMessages from '@crema/helpers/IntlMessages';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { TodoType } from '@crema/models/apps/Todo';

const StatusButton = styled(Button)(({ theme }) => ({
  fontSize: 12,
  [theme.breakpoints.up('lg')]: {
    fontSize: 14,
  },
}));

const StyledDoneIcon = styled(DoneIcon)(({ theme }) => ({
  marginRight: 4,
  fontSize: 18,
  verticalAlign: 'middle',
  [theme.breakpoints.up('sm')]: {
    marginRight: 8,
  },
}));

type Props = {
  selectedTask: TodoType;
};

const StatusToggleButton = ({ selectedTask }: Props) => {
  const dispatch = useAppDispatch();

  const onChangeTaskStatus = (status: number) => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, status }));
  };

  return (
    <>
      {selectedTask.status === 3 ? (
        <StatusButton
          variant="contained"
          color="primary"
          startIcon={<StyledDoneIcon />}
          onClick={() => onChangeTaskStatus(1)}
        >
          <IntlMessages id="todo.completed" />
        </StatusButton>
      ) : (
        <StatusButton
          variant="outlined"
          color="primary"
          startIcon={<StyledDoneIcon />}
          onClick={() => onChangeTaskStatus(3)}
        >
          <IntlMessages id="todo.markAsCompleted" />
        </StatusButton>
      )}
    </>
  );
};

export default StatusToggleButton;

StatusToggleButton.propTypes = {
  selectedTask: PropTypes.object.isRequired,
};
