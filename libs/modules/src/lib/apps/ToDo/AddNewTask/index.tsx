import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import IntlMessages from '@crema/helpers/IntlMessages';
import AddTaskForm from './AddTaskForm';
import AppDialog from '@crema/components/AppDialog';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { postDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';

import { useIntl } from 'react-intl';
import { generateRandomUniqueNumber } from '@crema/helpers';

type Props = {
  isAddTaskOpen: boolean;
  onCloseAddTask: () => void;
  reCallAPI?: () => void;
  selectedDate?: string;
};

const AddNewTask = ({
  isAddTaskOpen,
  onCloseAddTask,
  selectedDate,
  reCallAPI,
}: Props) => {
  const { messages } = useIntl();
  const validationSchema = yup.object({
    title: yup.string().required(String(messages['validation.titleRequired'])),
  });

  const { user } = useAuthUser();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [taskLabels, setTaskLabels] = useState([]);

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
          date: selectedDate
            ? dayjs(selectedDate).format('MM/DD/YYYY')
            : dayjs().format('MM/DD/YYYY'),
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
            startDate: dayjs(data.date).format('lll'),
            image: '/assets/images/dummy2.jpg',
            createdOn: dayjs().format('ll'),
            status: 1,
            comments: [],
            ...data,
            label: taskLabels,
          };
          console.log('newTask:***********', newTask);
          postDataApi('/api/todoApp/compose', infoViewActionsContext, {
            task: newTask,
          })
            .then(() => {
              if (reCallAPI) reCallAPI();
              infoViewActionsContext.showMessage(
                'New Task has been created successfully!'
              );
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });

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
