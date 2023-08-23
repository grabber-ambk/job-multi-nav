import React, { useEffect } from 'react';
import AppInfoView from '@crema/components/AppInfoView';
import Box from '@mui/material/Box';
import AppList from '@crema/components/AppList';
import { ListItem } from '@crema/modules/userList/Flat';
import { onGetUserList } from '../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';

const Flat = () => {
  const dispatch = useAppDispatch();

  const usersList = useAppSelector(({ userList }) => userList.usersList);

  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);

  return (
    <Box flex={1}>
      {usersList ? (
        <AppList
          data={usersList}
          renderRow={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </Box>
  );
};

export default Flat;
