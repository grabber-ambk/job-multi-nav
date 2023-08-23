import React, { useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShopTwoOutlinedIcon from '@mui/icons-material/ShopTwoOutlined';
import {
  onUpdateMailFolders,
  onUpdateMailLabels,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import IconButton from '@mui/material/IconButton';
import AppTooltip from '@crema/components/AppTooltip';
import { LabelType } from '@crema/models/apps/Mail';

type Props = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
};

const CheckedMailActions = (props: Props) => {
  const { checkedMails, setCheckedMails } = props;
  const dispatch = useAppDispatch();
  const [isLabelOpen, onOpenLabel] = useState<null | HTMLElement>(null);

  const [isMoveToOpen, onOpenMoveToIcon] = useState<null | HTMLElement>(null);

  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const folderList = useAppSelector(({ mailApp }) => mailApp.folderList);

  const onLabelOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onMoveToOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenMoveToIcon(event.currentTarget);
  };

  const onMoveToClose = () => {
    onOpenMoveToIcon(null);
  };

  const onChangeMailFolder = (type: number) => {
    dispatch(onUpdateMailFolders(checkedMails, type));
    setCheckedMails([]);
  };

  const onSelectLabel = (event: any) => {
    const labelType = labelList.find(
      (label) => label.id === event.target.value
    );
    dispatch(onUpdateMailLabels(checkedMails, labelType as LabelType));
    setCheckedMails([]);
    onOpenLabel(null);
  };

  return (
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
          size="large"
        >
          <ArchiveOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
          />
        </IconButton>
      </AppTooltip>

      <AppTooltip title={<IntlMessages id="common.reportSpam" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          onClick={() => onChangeMailFolder(125)}
          size="large"
        >
          <InfoOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
          />
        </IconButton>
      </AppTooltip>

      <AppTooltip title={<IntlMessages id="common.trash" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          onClick={() => onChangeMailFolder(126)}
          size="large"
        >
          <DeleteOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
          />
        </IconButton>
      </AppTooltip>

      <AppTooltip title={<IntlMessages id="common.label" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          onClick={onLabelOpen}
          size="large"
        >
          <LabelOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
          />
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

      <AppTooltip title={<IntlMessages id="common.moveTo" />}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          onClick={onMoveToOpen}
          size="large"
        >
          <ShopTwoOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
          />
        </IconButton>
      </AppTooltip>

      <Menu
        anchorEl={isMoveToOpen}
        open={Boolean(isMoveToOpen)}
        onClose={onMoveToClose}
      >
        {folderList.map((folder) => {
          return (
            <MenuItem
              onClick={() => onChangeMailFolder(folder.id)}
              key={folder.id}
            >
              {folder.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default CheckedMailActions;

CheckedMailActions.defaultProps = {
  checkedMails: [],
};
