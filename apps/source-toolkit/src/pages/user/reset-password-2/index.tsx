import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ResetPassword = asyncComponent(
  () => import('../../../modules/userPages/StyledUserPages/ResetPassword')
);
export default AppPage(() => <ResetPassword />);
