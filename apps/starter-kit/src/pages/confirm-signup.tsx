import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ConfirmSignup = asyncComponent(
  () => import('../modules/auth/Signup/ConfirmSignupAwsCognito')
);
export default AppPage(() => <ConfirmSignup />);
