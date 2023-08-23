import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ContactObjType } from '@crema/models/apps/Contact';
import AddContactForm from './AddContactForm';
import AppDialog from '@crema/components/AppDialog';
import { useIntl } from 'react-intl';
import {
  onCreateContact,
  onUpdateSelectedContact,
} from '../../../../toolkit/actions';
import { useAppDispatch } from '../../../../toolkit/hooks';
import {generateRandomUniqueNumber, getFormattedDate} from '@crema/helpers';

type Props = {
  isAddContact: boolean;
  handleAddContactClose: () => void;
  selectContact?: ContactObjType | null;
  onUpdateContact?: (newContact: ContactObjType) => void;
};

const CreateContact = (props: Props) => {
  const {
    isAddContact,
    handleAddContactClose,
    selectContact,
    onUpdateContact,
  } = props;
  const dispatch = useAppDispatch();
  const { messages } = useIntl();

  const validationSchema = yup.object({
    name: yup.string().required(String(messages['validation.nameRequired'])),
    email: yup
      .string()
      .email(String(messages['validation.emailFormat']))
      .required(String(messages['validation.emailRequired'])),
    contact: yup
      .string()
      .required(String(messages['validation.phoneNumberRequired'])),
  });

  const [userImage, setUserImage] = useState(
    selectContact && selectContact.image
      ? selectContact.image
      : '/assets/images/placeholder.jpg'
  );
  useEffect(() => {
    setUserImage(
      selectContact && selectContact.image
        ? selectContact.image
        : '/assets/images/placeholder.jpg'
    );
  }, [selectContact]);

  return (
    <AppDialog
      sxStyle={{
        '& .MuiDialog-paperWidthSm': {
          maxWidth: 900,
          height: 600,
        },
      }}
      maxScrollHeight={600}
      open={isAddContact}
      onClose={() => handleAddContactClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectContact ? selectContact.name : '',
          email: selectContact ? selectContact.email : '',
          contact: selectContact ? selectContact.contact : '',
          birthday:
            selectContact && selectContact.birthday
              ? selectContact.birthday
              : null,
          website:
            selectContact && selectContact.website ? selectContact.website : '',
          company:
            selectContact && selectContact.company ? selectContact.company : '',
          address:
            selectContact && selectContact.address ? selectContact.address : '',
          facebookId:
            selectContact && selectContact.facebookId
              ? selectContact.facebookId
              : '',
          twitterId:
            selectContact && selectContact.twitterId
              ? selectContact.twitterId
              : '',
          notes:
            selectContact && selectContact.notes ? selectContact.notes : '',
          label:
            selectContact && selectContact.label ? selectContact.label : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectContact) {
            const newContact = {
              ...data,
              id: selectContact.id,
              isStarred: selectContact.isStarred,
              isFrequent: selectContact.isFrequent,
              image: userImage,
              birthday: getFormattedDate(data.birthday as string),
            };
            dispatch(onUpdateSelectedContact(newContact as ContactObjType));
            if (onUpdateContact) onUpdateContact(newContact as ContactObjType);
          } else {
            const newContact = {
              ...data,
              id:generateRandomUniqueNumber(),
              isStarred: false,
              isFrequent: Math.random() > 0.5,
              image: userImage,
              birthday: getFormattedDate(data.birthday as string),
            };
            dispatch(onCreateContact(newContact as ContactObjType));
          }
          handleAddContactClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddContactForm
            setUserImage={setUserImage}
            userImage={userImage}
            values={values as ContactObjType}
            setFieldValue={setFieldValue}
            handleAddContactClose={handleAddContactClose}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateContact;
