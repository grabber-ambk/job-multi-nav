import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Page1 = asyncComponent(() => import('../../modules/sample/Page1'));
export default AppPage(() => <Page1 />);
