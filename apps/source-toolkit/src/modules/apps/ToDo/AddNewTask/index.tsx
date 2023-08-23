import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { onCreateTask } from '../../../../toolkit/actions';
import IntlMessages from '@crema/helpers/IntlMessages';
import AddTaskForm from './AddTaskForm';
import AppDialog from '@crema/components/AppDialog';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { useAppDispatch } from '../../../../toolkit/hooks';
import { useIntl } from 'react-intl';
import {
  generateRandomUniqueNumber,
  getDateObject,
  getFormattedDate,
} from '@crema/helpers';

type Props = {
  isAddTaskOpen: boolean;
  onCloseAddTask: () => void;
  selectedDate?: string;
};

const AddNewTask = ({ isAddTaskOpen, onCloseAddTask, selectedDate }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthUser();

  const [taskLabels, setTaskLabels] = useState([]);
  const { messages } = useIntl();
  const validationSchema = yup.object({
    title: yup.string().required(String(messages['validation.titleRequired'])),
  });
  return (
    <AppDialog
      dividers
      maxWidth="md"
      open={isAddTaskOpen}
      onClose={() => onCloseAddTask()}
      title={<IntlMessages id="todo.addNewTask" />}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          title: '',
          assignedTo: '',
          label: [],
          priority: 3,
          startDate: selectedDate
            ? getDateObject(selectedDate)
            : getDateObject(),
          content: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const newTask = {
            id: generateRandomUniqueNumber(),
            isStarred: false,
            isAttachment: false,
            isRead: true,
            folderValue: 120,
            createdBy: {
              name: user.displayName ? user.displayName : 'User',
              image: user.photoURL,
            },
            image: '/assets/images/dummy2.jpg',
            status: 1,
            comments: [],
            ...data,
            startDate: getFormattedDate(data.startDate),
            createdOn: getFormattedDate(undefined),
            label: taskLabels,
          };
          console.log('newTask:***********', newTask);
          dispatch(onCreateTask(newTask));
          onCloseAddTask();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <AddTaskForm
            isSubmitting={isSubmitting}
            values={values}
            setFieldValue={setFieldValue}
            setTaskLabels={setTaskLabels}
            taskLabels={taskLabels}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default AddNewTask;
