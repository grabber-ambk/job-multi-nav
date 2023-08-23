import React from 'react';
import AppList from '@crema/components/AppList';

import AppLoader from '@crema/components/AppLoader';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { ListItem } from '@crema/modules/userList/Modern';
import { UserListProps } from '@crema/models/Apps';

const Modern = () => {
  const [{ apiData: usersList, loading }] =
    useGetDataApi<UserListProps[]>('/api/user/list');
  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppList
          data={usersList}
          renderRow={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      )}
    </>
  );
};

export default Modern;
