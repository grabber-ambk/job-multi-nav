import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useIntl } from 'react-intl';
import AppSearchBar from '@crema/components/AppSearchBar';
import PropTypes from 'prop-types';
import SelectTasksDropdown from './SelectTasksDropdown';
import CheckedTasksActions from './CheckedTasksActions';
import AppsPagination from '@crema/components/AppsPagination';
import Hidden from '@mui/material/Hidden';
import { TodoType, TodoDataType } from '@crema/models/apps/Todo';

type Props = {
  taskLists: TodoType[];
  totalTasks: number;
  onUpdateTasks: (tasks: TodoType[]) => void;
  setData: (data: TodoDataType) => void;
  checkedTasks: number[];
  setCheckedTasks: (data: number[]) => void;
  filterText: string;
  onSetFilterText: (data: string) => void;
  onPageChange: (event: any, value: number) => void;
  page: number;
};
const TaskContentHeader = (props: Props) => {
  const {
    taskLists,
    totalTasks,
    onUpdateTasks,
    setData,
    checkedTasks,
    setCheckedTasks,
    filterText,
    onSetFilterText,
    onPageChange,
    page,
  } = props;

  const onHandleMasterCheckbox = (event: any) => {
    if (event.target.checked) {
      const taskIds = taskLists?.map((task) => task.id);
      setCheckedTasks(taskIds);
    } else {
      setCheckedTasks([]);
    }
  };

  const onSelectTasks = (value: number) => {
    switch (value) {
      case 0:
        setCheckedTasks(taskLists?.map((task) => task.id));
        break;
      case 1:
        setCheckedTasks([]);
        break;

      case 2:
        setCheckedTasks(
          taskLists?.filter((task) => task.isStarred).map((task) => task.id)
        );
        break;

      case 3:
        setCheckedTasks(
          taskLists?.filter((task) => task.isAttachment).map((task) => task.id)
        );
        break;

      default:
        setCheckedTasks([]);
    }
  };

  const { messages } = useIntl();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <span>
          <Checkbox
            sx={{
              color: 'text.disabled',
            }}
            indeterminate={
              checkedTasks.length > 0 &&
              checkedTasks?.length < taskLists?.length
            }
            checked={
              taskLists?.length > 0 &&
              checkedTasks?.length === taskLists?.length
            }
            onChange={onHandleMasterCheckbox}
          />
        </span>
        <Box sx={{ mr: 3 }}>
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            value={filterText}
            onChange={(event: any) => onSetFilterText(event.target.value)}
            placeholder={messages['common.searchHere'] as string}
          />
        </Box>
        <SelectTasksDropdown
          onSelectTasks={onSelectTasks}
          checkedTasks={checkedTasks}
        />
        {checkedTasks.length > 0 ? (
          <Box
            component="span"
            sx={{
              mr: { sm: 4 },
              display: 'flex',
            }}
          >
            <CheckedTasksActions
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              setData={setData}
              onUpdateTasks={onUpdateTasks}
              page={page}
            />
          </Box>
        ) : null}
      </Box>

      <Hidden smDown>
        {taskLists?.length > 0 ? (
          <AppsPagination
            sx={{
              paddingRight: 2,
              paddingLeft: 2,
              '& .MuiToolbar-root': {
                paddingLeft: 0,
              },
              '& .MuiTablePagination-actions': {
                marginLeft: 0,
                '& .MuiButtonBase-root': {
                  padding: 2,
                },
              },
            }}
            count={totalTasks}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default TaskContentHeader;

TaskContentHeader.defaultProps = {
  checkedTasks: [],
  filterText: '',
  page: 0,
};

TaskContentHeader.propTypes = {
  checkedTasks: PropTypes.array,
  taskLists: PropTypes.array,
  totalTasks: PropTypes.number,
  setCheckedTasks: PropTypes.func,
  onUpdateTasks: PropTypes.func,
  setData: PropTypes.func,
  viewMode: PropTypes.string,
  onViewModeSelect: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
};
