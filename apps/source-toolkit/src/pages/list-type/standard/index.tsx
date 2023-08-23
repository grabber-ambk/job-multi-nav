import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Standard = asyncComponent(
  () => import('../../../modules/userList/Standard')
);
export default AppPage(() => <Standard />);
