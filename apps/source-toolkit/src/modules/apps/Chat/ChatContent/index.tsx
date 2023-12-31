import React from 'react';
import ChatViewContainer from './ChatViewContainer';
import { NoUserScreen } from '@crema/modules/apps/Chat';
import { ConnectionType } from '@crema/models/apps/Chat';
import { styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';
import { isEmptyObject } from '@crema/helpers';

const MessagesScreen = styled('div')(() => {
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };
});
const ScrollChatNoUser = styled('div')(({ theme }) => {
  return {
    fontSize: 18,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: 'calc(100vh - 169px) !important',
    fontWeight: Fonts.MEDIUM,
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
      color: '#BDBDBD',
      [theme.breakpoints.up('lg')]: {
        fontSize: '5rem',
      },
    },
  };
});

type Props = {
  selectedUser: ConnectionType;
};

const ChatContent = ({ selectedUser }: Props) => {
  return (
    <>
      {!isEmptyObject(selectedUser) ? (
        <MessagesScreen>
          <ChatViewContainer selectedUser={selectedUser} />
        </MessagesScreen>
      ) : (
        <ScrollChatNoUser>
          <NoUserScreen />
        </ScrollChatNoUser>
      )}
    </>
  );
};

export default ChatContent;
