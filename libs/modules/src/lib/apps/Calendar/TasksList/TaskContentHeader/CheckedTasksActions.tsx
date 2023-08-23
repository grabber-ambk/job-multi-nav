import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import AppTooltip from '@crema/components/AppTooltip';
import { StyledBox } from './index.style';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { LabelType, TodoDataType, TodoType } from '@crema/models/apps/Todo';

type Props = {
  checkedTasks: number[];
  setCheckedTasks: (data: number[]) => void;
  setData: (data: TodoDataType) => void;
  onUpdateTasks: (tasks: TodoType[]) => void;
  page: number;
};
const CheckedTasksActions = ({
  checkedTasks,
  setCheckedTasks,
  setData,
  onUpdateTasks,
  page,
}: Props) => {
  const router = useRouter();
  const { all } = router.query;
  let folder = '';
  let label = '';

  // if (all?.length === 2 && !+all?.[1] > 0) {
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all?.[0];
  }

  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: labelList }] = useGetDataApi<LabelType[]>(
    '/api/todo/labels/list',
    []
  );

  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const onLabelOpen = (event: any) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onDeleteTasks = () => {
    putDataApi<TodoDataType>(
      '/api/todo/update/folder',
      infoViewActionsContext,
      {
        taskIds: checkedTasks,
        type: folder ? 'folder' : 'label',
        name: folder || label,
        page,
      }
    )
      .then((data) => {
        setData(data);
        setCheckedTasks([]);
        infoViewActionsContext.showMessage('Task Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onSelectLabel = (event: any) => {
    const labelType = event.target.value;
    putDataApi<TodoType[]>('/api/todo/update/label', infoViewActionsContext, {
      taskIds: checkedTasks,
      type: +labelType,
    })
      .then((data) => {
        onUpdateTasks(data);
        setCheckedTasks([]);
        onLabelClose();
        infoViewActionsContext.showMessage('Task Updated Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
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

CheckedTasksActions.propTypes = {
  checkedTasks: PropTypes.array.isRequired,
  setCheckedTasks: PropTypes.func,
  setData: PropTypes.func,
  onUpdateTasks: PropTypes.func,
  page: PropTypes.number.isRequired,
};
