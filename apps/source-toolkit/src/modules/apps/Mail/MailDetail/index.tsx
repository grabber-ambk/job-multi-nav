import React, { createRef, useEffect } from 'react';
import MailDetailHeader from './MailDetailHeader';
import MailDetailBody from './MailDetailBody';
import { useRouter } from 'next/router';
import AppsContent from '@crema/components/AppsContent';
import AppsHeader from '@crema/components/AppsHeader';
import AppAnimate from '@crema/components/AppAnimate';
import { MailDetailSkeleton } from '@crema/components/MailDetailSkeleton';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onGetSelectedMail,
  onNullifyMail,
  onUpdateMailReadStatus,
} from '../../../../toolkit/actions';

const MailDetail = () => {
  const dispatch = useAppDispatch();
  const contentRef = createRef();
  const router = useRouter();

  const { all } = router.query;
  const id = all?.slice(-1)[0];

  const selectedMail = useAppSelector(({ mailApp }) => mailApp.selectedMail);

  useEffect(() => {
    dispatch(onGetSelectedMail(Number(id)));
    return () => {
      onNullifyMail();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedMail && !selectedMail.isRead) {
      dispatch(onUpdateMailReadStatus([selectedMail.id], true));
    }
  }, [dispatch, selectedMail]);

  if (!selectedMail) {
    return <MailDetailSkeleton />;
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={contentRef}
    >
      <AppsHeader>
        <MailDetailHeader selectedMail={selectedMail} />
      </AppsHeader>
      <AppsContent isDetailView>
        <AppAnimate animatoin="transition.slideUpIn">
          <MailDetailBody selectedMail={selectedMail} />
        </AppAnimate>
      </AppsContent>
    </Box>
  );
};

export default MailDetail;
