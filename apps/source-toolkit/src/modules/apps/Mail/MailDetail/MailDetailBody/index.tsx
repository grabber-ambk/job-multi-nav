import React from 'react';
import Box from '@mui/material/Box';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import AppTooltip from '@crema/components/AppTooltip';
import { MessageItem } from '@crema/modules/apps/Mail';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedMail } from '../../../../../toolkit/actions';
import { MailType, MessageType } from '@crema/models/apps/Mail';

type Props = {
  selectedMail: MailType;
};

function addObjectInMiddle(
  array: MessageType[],
  index: number,
  object: MessageType
) {
  const newArray = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i];
  }
  newArray[index] = object;
  return newArray;
}

const MailDetailBody = (props: Props) => {
  const dispatch = useAppDispatch();
  const { selectedMail } = props;

  const onSubmitMail = (message: MessageType, index: number) => {
    const messages = selectedMail.messages;
    if (messages)
      dispatch(
        onUpdateSelectedMail({
          ...selectedMail,
          messages: addObjectInMiddle(messages, index + 1, message),
        })
      );
  };

  const onChangeStarred = (message: MessageType, isStarred: boolean) => {
    const messages = selectedMail.messages!.map((data) =>
      data.messageId === message.messageId ? { ...message, isStarred } : data
    );
    dispatch(onUpdateSelectedMail({ ...selectedMail, messages }));
  };
  return (
    <Box sx={{ px: 5, py: 1 }}>
      {selectedMail ? (
        <>
          <Box
            sx={{
              pt: 1,
              pb: 3,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: 16, sm: 18 },
                marginRight: 3,
                paddingLeft: { xs: 0, sm: 12.5 },
              }}
            >
              {selectedMail.subject}
            </Box>
            <AppTooltip title={selectedMail.label.name}>
              <span
                style={{
                  color: selectedMail.label.color,
                  height: 22,
                  cursor: 'pointer',
                }}
              >
                <LabelOutlinedIcon />
              </span>
            </AppTooltip>
          </Box>
          {selectedMail?.messages?.map((message, index) => (
            <MessageItem
              key={index}
              index={index}
              mailLength={selectedMail.messages!.length}
              message={message}
              onSubmitMail={onSubmitMail}
              onChangeStarred={onChangeStarred}
            />
          ))}
        </>
      ) : null}
    </Box>
  );
};

export default MailDetailBody;
