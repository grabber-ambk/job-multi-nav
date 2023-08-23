import React from 'react';
import Box from '@mui/material/Box';
import AppSearchBar from '@crema/components/AppSearchBar';
import { Hidden } from '@mui/material';
import { useIntl } from 'react-intl';
import CheckBox from './CheckBox';
import ContactCheckedActions from './ContactCheckedActions';
import AppsPagination from '@crema/components/AppsPagination';
import { ViewSelectButtons } from '@crema/modules/apps/Contact';
import { useAppSelector } from '../../../../../toolkit/hooks';

type Props = {
  checkedContacts: number[];
  setCheckedContacts: (checkedContacts: number[]) => void;
  filterText: string;
  onSetFilterText: (filterText: string) => void;
  onSelectContactsForDelete: (ids: number[]) => void;
  page: number;
  pageView: string;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    data: number
  ) => void;
  onChangePageView: (page: string) => void;
};

const ContactHeader = (props: Props) => {
  const {
    checkedContacts,
    setCheckedContacts,
    filterText,
    onSetFilterText,
    onChangePageView,
    onSelectContactsForDelete,
    page,
    onPageChange,
    pageView,
  } = props;

  const contactList = useAppSelector(
    ({ contactApp }) => contactApp.contactList
  );

  const totalContacts = useAppSelector(
    ({ contactApp }) => contactApp.totalContacts
  );

  const { messages } = useIntl();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CheckBox
          checkedContacts={checkedContacts}
          setCheckedContacts={setCheckedContacts}
        />

        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSetFilterText(event.target.value)
          }
          placeholder={messages['common.searchHere'] as string}
        />
        {checkedContacts.length > 0 ? (
          <ContactCheckedActions
            onSelectContactsForDelete={onSelectContactsForDelete}
            checkedContacts={checkedContacts}
            setCheckedContacts={setCheckedContacts}
          />
        ) : null}

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </Box>
      <Hidden smDown>
        {contactList.length > 0 ? (
          <AppsPagination
            sx={{ ml: 2 }}
            count={totalContacts}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default ContactHeader;

ContactHeader.defaultProps = {
  checkedContacts: [],
  filterText: '',
  page: 0,
};
