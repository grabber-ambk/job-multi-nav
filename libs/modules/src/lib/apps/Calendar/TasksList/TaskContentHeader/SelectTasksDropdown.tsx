import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useIntl } from 'react-intl';
import { StyledSelect } from './index.style';

type Props = {
  checkedTasks: number[];
  onSelectTasks: (data: number) => void;
};

const SelectTasksDropdown = ({ checkedTasks, onSelectTasks }: Props) => {
  const [selectedItems, setSelectedItems] = useState(1);
  useEffect(() => {
    if (checkedTasks.length === 0) setSelectedItems(1);
  }, [checkedTasks]);
  const onChangeSelectValue = (event: any) => {
    setSelectedItems(event.target.value);
    onSelectTasks(event.target.value);
  };

  const { messages } = useIntl();

  return (
    <Box
      sx={{
        mr: { xs: 2, xl: 4 },
      }}
      component="span"
    >
      <StyledSelect value={selectedItems} onChange={onChangeSelectValue}>
        <MenuItem
          value={1}
          sx={{
            padding: 2,
            cursor: 'pointer',
            minHeight: 'auto',
          }}
        >
          {messages['common.none'] as string}
        </MenuItem>
        <MenuItem
          value={0}
          sx={{
            padding: 2,
            cursor: 'pointer',
            minHeight: 'auto',
          }}
        >
          {messages['common.all'] as string}
        </MenuItem>
        <MenuItem
          value={2}
          sx={{
            padding: 2,
            cursor: 'pointer',
            minHeight: 'auto',
          }}
        >
          {messages['common.starred'] as string}
        </MenuItem>
        <MenuItem
          value={3}
          sx={{
            padding: 2,
            cursor: 'pointer',
            minHeight: 'auto',
          }}
        >
          {messages['common.attachments'] as string}
        </MenuItem>
      </StyledSelect>
    </Box>
  );
};

export default SelectTasksDropdown;
