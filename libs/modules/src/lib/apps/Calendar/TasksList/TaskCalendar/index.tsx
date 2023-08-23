import React, { useState } from 'react';
import { momentLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import { StyledCalendar } from './Calendar.style';
// import './calendar.css';
import CustomToolbar from './CustomToolbar';
import TaskItem from './TaskItem';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { TodoType } from '@crema/models/apps/Todo';
import { useRouter } from 'next/router';

const DragAndDropCalendar = withDragAndDrop(StyledCalendar as any);

const localizer = momentLocalizer(moment);

type Props = {
  taskList: TodoType[];
  onUpdateTask: (data: object) => void;
  onSetFilterText: (text: string) => void;
};
const TaskCalender = ({ taskList, onUpdateTask, onSetFilterText }: Props) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);

  const router = useRouter();
  const { all } = router.query;

  let folder: any;
  let label: any;
  if ((all as string[]).length === 2) {
    label = (all as string[])[1];
  } else if ((all as string[]).length === 1) {
    folder = (all as string[])[0];
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const onSelectDate = ({ start }: { start: any }) => {
    console.log('start: ', start);
    setSelectedDate(start);
    setAddTaskOpen(true);
  };

  const onViewTaskDetail = (task: TodoType) => {
    if (folder) router.push(`/apps/calender/${folder}/${task.id}`);
    if (label) router.push(`/apps/calender/label/${label}/${task.id}`);
  };

  const onOpenAddTask = (data: any) => {
    if (data) {
      onViewTaskDetail(data);
    } else {
      if (selectedDate) {
        setAddTaskOpen(true);
      } else {
        setAddTaskOpen(false);
      }
    }
  };
  const resizeEvent = ({
    event,
    start,
    end,
  }: {
    event: object;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    // onUpdateTask({ ...event, startDate: start, endDate: end });
    console.log('resizeEvent: ', event, start, end);
  };

  const moveEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }: {
    event: object;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    onUpdateTask({ ...event, startDate: start, endDate: end });
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  const getEvents = () => {
    if (taskList?.length > 0)
      return taskList.map((task) => {
        return {
          ...task,
          title: task.title,
          start: new Date(task.startDate),
          end: task.endDate ? new Date(task.endDate) : new Date(),
        };
      });
    return [];
  };
  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={getEvents()}
      // themeVariant="dark"
      views={['month', 'agenda']}
      tooltipAccessor={undefined}
      showMultiDayTimes
      resizable
      onEventResize={resizeEvent}
      onEventDrop={moveEvent}
      onSelectEvent={onOpenAddTask}
      components={{
        toolbar: (props) => (
          <CustomToolbar onSetFilterText={onSetFilterText} {...props} />
        ),
        event: (item) => <TaskItem key={item.title} item={item.event} />,
      }}
      popup
      selectable
      onSelectSlot={onSelectDate}
      defaultView="month"
    />
  );
};
export default TaskCalender;
