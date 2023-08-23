import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsHeader from '@crema/components/AppsHeader';
import AppsFooter from '@crema/components/AppsFooter';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import SimpleBarReact from 'simplebar-react';

import { styled } from '@mui/material/styles';
import { Header, MessagesList, SendMessage } from '@crema/modules/apps/Chat';
import {
  getConnectionMessages,
  onDeleteConversation,
  onDeleteMessage,
  onEditMessage,
  onSendMessage,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import {
  ConnectionType,
  MessageDataType,
  MessageType,
} from '@crema/models/apps/Chat';

const ScrollbarWrapper = styled(SimpleBarReact)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - 132px)`,
  };
});
const ScrollChatNoMainWrapper = styled('div')(() => {
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  };
});

type Props = {
  selectedUser: ConnectionType;
};

const ChatViewContainer = ({ selectedUser }: Props) => {
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<MessageDataType | null>(null);
  const { user } = useAuthUser();
  const dispatch = useAppDispatch();

  const _scrollBarRef = useRef<any>();
  const userMessages = useAppSelector(({ chatApp }) => chatApp.userMessages);

  useEffect(() => {
    dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      userMessages &&
      userMessages.messageData &&
      userMessages.messageData.length > 0
    ) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage: MessageDataType) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: dayjs().format('llll'),
    };

    dispatch(onSendMessage(selectedUser.channelId, data));
  };

  const onSend = (message: string) => {
    const data = {
      ...selectedMessage,
      message,
      message_type: MessageType.TEXT,
      sender: user.id,
      time: dayjs().format('llll'),
    };

    if (isEdit) {
      data.edited = true;
      dispatch(onEditMessage(selectedUser.channelId, data));
      setMessage('');
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      console.log('data', data, selectedUser);
      dispatch(onSendMessage(selectedUser.channelId, data));
      setMessage('');
    }
  };

  const onClickEditMessage = (data: MessageDataType) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message as string);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId: number) => {
    dispatch(onDeleteMessage(selectedUser.channelId, messageId));
  };

  const deleteConversation = () => {
    dispatch(onDeleteConversation(selectedUser.channelId));
  };

  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& .apps-header': {
          minHeight: 72,
        },
      }}
    >
      <AppsHeader>
        <Header
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        />
      </AppsHeader>

      {userMessages && user ? (
        <ScrollbarWrapper ref={_scrollBarRef}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </ScrollbarWrapper>
      ) : (
        <ScrollChatNoMainWrapper>
          <Box
            component="span"
            sx={{
              fontSize: 18,
              color: 'grey.500',
            }}
          >
            <IntlMessages id="chatApp.sayHi" /> {selectedUser.name}
          </Box>
        </ScrollChatNoMainWrapper>
      )}

      <AppsFooter>
        <SendMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </AppsFooter>
    </Box>
  );
};

export default ChatViewContainer;
