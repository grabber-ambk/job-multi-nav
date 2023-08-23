import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Signup = asyncComponent(
  () => import('../../../modules/userPages/UserPages/Signup')
);
export default AppPage(() => <Signup />);
