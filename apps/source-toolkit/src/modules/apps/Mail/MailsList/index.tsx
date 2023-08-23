import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MailContentHeader from './MailContentHeader';
import {
  onGetMailList,
  onUpdateMailStarredStatus,
} from '../../../../toolkit/actions';
import { Hidden } from '@mui/material';
import AppsPagination from '@crema/components/AppsPagination';
import AppsContent from '@crema/components/AppsContent';
import AppsHeader from '@crema/components/AppsHeader';
import AppsFooter from '@crema/components/AppsFooter';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import EmailListSkeleton from '@crema/components/EmailListSkeleton';
import MailListItem from './MailListItem';
import { MailListItemMobile } from '@crema/modules/apps/Mail';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { MailType } from '@crema/models/apps/Mail';

const MailsList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = router;
  const { all } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const [filterText, onSetFilterText] = useState('');

  const mailList = useAppSelector(({ mailApp }) => mailApp.mailList);

  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const [page, setPage] = useState(0);

  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    setPage(0);
    if (folder) {
      dispatch(onGetMailList('folder', folder, page));
    }
    if (label) {
      dispatch(onGetMailList('label', label, page));
    }
  }, [dispatch, folder, label, page]);

  const [checkedMails, setCheckedMails] = useState<number[]>([]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    value: number
  ) => {
    setPage(value);
  };

  const onChangeCheckedMails = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  const onViewMailDetail = (mail: MailType) => {
    if (label) router.push(`/apps/mail/label/${label}/${mail.id}`);
    if (folder) router.push(`/apps/mail/${folder}/${mail.id}`);
  };

  const path = router.asPath.split('/');
  const onChangeStarred = (checked: boolean, mail: MailType) => {
    dispatch(
      onUpdateMailStarredStatus([mail.id], checked, path[path.length - 1])
    );
  };

  const onGetFilteredMails = () => {
    if (filterText === '') {
      return mailList;
    } else {
      return mailList.filter(
        (mail) =>
          mail?.subject?.toLowerCase().includes(filterText.toLowerCase()) ||
          mail?.detail?.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  };

  const totalMails = useAppSelector(({ mailApp }) => mailApp.totalMails);

  const list = onGetFilteredMails();
  console.log('list', list, mailList, labelList);
  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          onPageChange={onPageChange}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          page={page}
          path={path}
        />
      </AppsHeader>
      <AppsContent>
        <Hidden smDown>
          <AppList
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderRow={(mail) => (
              <MailListItem
                key={mail.id}
                mail={mail}
                onChangeCheckedMails={onChangeCheckedMails}
                checkedMails={checkedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
              />
            )}
          />
        </Hidden>
        <Hidden smUp>
          <AppList
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderRow={(mail) => (
              <MailListItemMobile
                key={mail.id}
                mail={mail}
                checkedMails={checkedMails}
                onChangeCheckedMails={onChangeCheckedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
              />
            )}
          />
        </Hidden>
      </AppsContent>
      <Hidden smUp>
        {list?.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalMails}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default MailsList;
