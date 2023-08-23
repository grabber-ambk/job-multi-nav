import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import IntlMessages from '@crema/helpers/IntlMessages';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';
import { TodoType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoType;
};

const TaskStatus = ({ selectedTask }: Props) => {
  const statusList = useAppSelector(
    ({ calendarApp }) => calendarApp.statusList
  );

  const dispatch = useAppDispatch();

  const onChangeStatus = (event: SelectChangeEvent<number>) => {
    dispatch(
      onUpdateSelectedCalTask({ ...selectedTask, status: event.target.value })
    );
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="status-select-outlined-label">
        <IntlMessages id="common.status" />
      </InputLabel>
      <Select
        labelId="status-select-outlined-label"
        label={<IntlMessages id="common.status" />}
        value={selectedTask.status}
        onChange={(event) => onChangeStatus(event)}
        sx={{
          cursor: 'pointer',
          '& .MuiOutlinedInput-input': {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
      >
        {statusList.map((status) => {
          return (
            <MenuItem
              key={status.type}
              value={status.type}
              sx={{
                padding: 2,
                cursor: 'pointer',
              }}
            >
              {status.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskStatus;

TaskStatus.propTypes = {
  selectedTask: PropTypes.object.isRequired,
};
