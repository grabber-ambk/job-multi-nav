import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../toolkit/hooks';
import { onGetFolderList, onGetLabelList } from '../../../toolkit/actions';
import ContactListing from './ContactListing';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import SideBarContent from './ContactSideBar';

const Contact = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetLabelList());
  }, [dispatch]);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['contactApp.contact'] as string}
      sidebarContent={<SideBarContent />}
    >
      <ContactListing />
    </AppsContainer>
  );
};

export default Contact;
