import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ResetPassword = asyncComponent(
  () => import('../modules/auth/ForgetPassword/ResetPasswordAwsCognito')
);
export default AppPage(() => <ResetPassword />);
