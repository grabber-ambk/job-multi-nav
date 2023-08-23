import React, { useEffect } from 'react';
import { ChatSideBar } from '@crema/modules/apps/Chat';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import { getConnectionList, onSelectUser } from '../../../toolkit/actions';
import ChatContent from './ChatContent';
import { ConnectionType } from '@crema/models/apps/Chat';

const Chat = () => {
  const selectedUser = useAppSelector(({ chatApp }) => chatApp.selectedUser);

  const dispatch = useAppDispatch();
  const connectionList = useAppSelector(
    ({ chatApp }) => chatApp.connectionList
  );
  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    dispatch(getConnectionList());
  }, [dispatch]);

  const { messages } = useIntl();

  const setSelectedUser = (item: ConnectionType) => {
    dispatch(onSelectUser(item));
  };

  return (
    <AppsContainer
      title={messages['chatApp.chat'].toString()}
      sidebarContent={
        <ChatSideBar
          selectedUser={selectedUser as ConnectionType}
          setSelectedUser={setSelectedUser}
          connectionList={connectionList}
          loading={loading}
        />
      }
    >
      <ChatContent selectedUser={selectedUser as ConnectionType} />
    </AppsContainer>
  );
};

export default Chat;
