import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {
  onDeleteSelectedTasks,
  onUpdateTaskLabels,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import IconButton from '@mui/material/IconButton';
import AppTooltip from '@crema/components/AppTooltip';
import { StyledBox } from './index.style';
import { useRouter } from 'next/router';

type Props = {
  checkedTasks: number[];
  setCheckedTasks: (data: number[]) => void;
  page: number;
};

const CheckedTasksActions = ({
  checkedTasks,
  setCheckedTasks,
  page,
}: Props) => {
  const router = useRouter();
  const { all } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const dispatch = useAppDispatch();
  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const labelList = useAppSelector(({ todoApp }) => todoApp.labelList);

  const onLabelOpen = (event: any) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onDeleteTasks = () => {
    if (folder)
      dispatch(onDeleteSelectedTasks(checkedTasks, 'folder', folder, page));
    if (label)
      dispatch(onDeleteSelectedTasks(checkedTasks, 'label', label, page));

    setCheckedTasks([]);
  };

  const onSelectLabel = (event: any) => {
    const labelType = event.target.value;
    dispatch(onUpdateTaskLabels(checkedTasks, labelType));
    setCheckedTasks([]);
    onLabelClose();
  };

  return (
    <>
      <StyledBox component="span">
        <Box component="span">
          <AppsDeleteIcon
            deleteAction={onDeleteTasks}
            deleteTitle={<IntlMessages id="todo.deleteMessage" />}
            sx={{
              cursor: 'pointer',
              color: 'text.disabled',
            }}
          />
        </Box>

        <Box component="span">
          <AppTooltip title={<IntlMessages id="common.label" />}>
            <IconButton
              sx={{
                color: 'text.disabled',
              }}
              size="large"
            >
              <LabelOutlinedIcon
                sx={{
                  cursor: 'pointer',
                  color: 'text.disabled',
                  display: 'block',
                }}
                onClick={onLabelOpen}
              />
            </IconButton>
          </AppTooltip>
        </Box>
      </StyledBox>
      <Menu
        anchorEl={isLabelOpen}
        open={Boolean(isLabelOpen)}
        onClose={onLabelClose}
      >
        {labelList.map((label) => {
          return (
            <MenuItem
              key={label.id}
              sx={{ p: '8px !important' }}
              value={label.id}
              onClick={onSelectLabel}
            >
              {label.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CheckedTasksActions;
