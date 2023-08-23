// import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default AppPage(() => <SignIn />);
