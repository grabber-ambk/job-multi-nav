import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Flat = asyncComponent(() => import('../../../modules/userList/Flat'));
export default AppPage(() => <Flat />);
