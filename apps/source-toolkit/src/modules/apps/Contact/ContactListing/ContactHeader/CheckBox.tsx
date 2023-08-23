import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../../../../toolkit/hooks';

type Props = {
  checkedContacts: number[];
  setCheckedContacts: (contactIds: number[]) => void;
};

const CheckBox = ({ checkedContacts, setCheckedContacts }: Props) => {
  const contactList = useAppSelector(
    ({ contactApp }) => contactApp.contactList
  );

  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const contactIds = contactList.map((contact) => contact.id);
      setCheckedContacts(contactIds);
    } else {
      setCheckedContacts([]);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Checkbox
        sx={{
          color: (theme) => theme.palette.text.disabled,
        }}
        color="primary"
        indeterminate={
          checkedContacts.length > 0 &&
          checkedContacts.length < contactList.length
        }
        checked={
          contactList.length > 0 &&
          checkedContacts.length === contactList.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </Box>
  );
};

export default CheckBox;
