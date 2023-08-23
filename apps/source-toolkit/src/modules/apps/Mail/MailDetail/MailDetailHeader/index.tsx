import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import AppTooltip from '@crema/components/AppTooltip';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedMail } from '../../../../../toolkit/actions';
import { MailType } from '@crema/models/apps/Mail';

type Props = {
  selectedMail: MailType;
};

const MailDetailHeader = (props: Props) => {
  const { selectedMail } = props;
  const dispatch = useAppDispatch();

  const router = useRouter();

  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const [isLabelOpen, onOpenLabel] = React.useState<null | HTMLElement>(null);

  const [isMoreIcon, onOpenMoreIcon] = React.useState<null | HTMLElement>(null);

  const onClickBackButton = () => {
    router.back();
  };

  const onLabelOpen = (event: React.MouseEvent<HTMLElement>) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onViewMoreOpen = (event: React.MouseEvent<HTMLElement>) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const onSelectLabel = (event: any) => {
    const labelType = labelList.find(
      (label) => label.id === event.target.value
    );
    dispatch(onUpdateSelectedMail({ ...selectedMail, label: labelType! }));
    onOpenLabel(null);
  };

  const onChangeMailFolder = (type: number) => {
    dispatch(onUpdateSelectedMail({ ...selectedMail, folderValue: type }));
    router.back();
  };

  const onChangeReadStatus = () => {
    dispatch(onUpdateSelectedMail({ ...selectedMail, isRead: false }));
    router.back();
  };

  const onChangeStarredStatus = () => {
    dispatch(
      onUpdateSelectedMail({
        ...selectedMail,
        isStarred: !selectedMail.isStarred,
      })
    );
    onOpenMoreIcon(null);
  };

  if (!selectedMail) return null;
  return (
    <>
      <AppTooltip title={<IntlMessages id="common.back" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          onClick={onClickBackButton}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </AppTooltip>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AppTooltip title={<IntlMessages id="common.archive" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={() => onChangeMailFolder(127)}
          >
            <ArchiveOutlinedIcon />
          </IconButton>
        </AppTooltip>

        <AppTooltip title={<IntlMessages id="common.reportSpam" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={() => onChangeMailFolder(125)}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </AppTooltip>

        <AppTooltip title={<IntlMessages id="common.trash" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={() => onChangeMailFolder(126)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </AppTooltip>

        <AppTooltip title={<IntlMessages id="mailApp.markAsUnread" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={() => onChangeReadStatus()}
          >
            <MarkunreadOutlinedIcon />
          </IconButton>
        </AppTooltip>

        <AppTooltip title={<IntlMessages id="common.label" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            value={1}
            onClick={onLabelOpen}
          >
            <LabelOutlinedIcon />
          </IconButton>
        </AppTooltip>

        <Menu
          anchorEl={isLabelOpen}
          open={Boolean(isLabelOpen)}
          onClose={onLabelClose}
        >
          {labelList.map((label) => {
            return (
              <MenuItem onClick={onSelectLabel} value={label.id} key={label.id}>
                {label.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      <Box
        sx={{
          ml: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AppTooltip title={<IntlMessages id="common.more" />}>
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            onClick={onViewMoreOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </AppTooltip>

        <Menu
          anchorEl={isMoreIcon}
          open={Boolean(isMoreIcon)}
          onClose={onViewMoreClose}
        >
          <MenuItem onClick={onChangeReadStatus}>
            <IntlMessages id="mailApp.markAsUnread" />
          </MenuItem>
          <MenuItem onClick={onChangeStarredStatus}>
            {selectedMail.isStarred ? (
              <IntlMessages id="mailApp.markAsNotImportant" />
            ) : (
              <IntlMessages id="mailApp.markAsImportant" />
            )}
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default MailDetailHeader;
