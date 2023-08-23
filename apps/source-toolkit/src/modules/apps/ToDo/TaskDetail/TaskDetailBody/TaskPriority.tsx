import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import IntlMessages from '@crema/helpers/IntlMessages';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';
import { MenuItem } from '@mui/material';
import { TodoType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoType;
};

const TaskPriority = ({ selectedTask }: Props) => {
  const dispatch = useAppDispatch();
  const priorityList = useAppSelector(({ todoApp }) => todoApp.priorityList);

  const [priority, setPriority] = useState<number>(selectedTask.priority.type);

  const onChangePriority = (event: SelectChangeEvent<number>) => {
    setPriority(event.target.value as number);
    const priority = priorityList.find(
      (data) => data.type.toString() === event.target.value.toString()
    );
    if (priority) dispatch(onUpdateSelectedTask({ ...selectedTask, priority }));
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="priority-select-outlined-label">
        <IntlMessages id="common.priority" />
      </InputLabel>
      <Select
        labelId="priority-select-outlined-label"
        label={<IntlMessages id="common.priority" />}
        name="priority"
        value={priority}
        onChange={(event) => onChangePriority(event)}
        sx={{
          cursor: 'pointer',
          '& .MuiOutlinedInput-input': {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
      >
        {priorityList.map((priority) => {
          return (
            <MenuItem
              key={priority.id}
              value={priority.type}
              sx={{
                padding: 2,
                cursor: 'pointer',
              }}
            >
              {priority.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TaskPriority;
