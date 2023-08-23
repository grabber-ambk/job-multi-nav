import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const Todo = dynamic(() => import('../../../modules/apps/ToDo'), {
  loading: () => <AppLoader />,
  ssr: false,
});
export default AppPage(() => <Todo />);
