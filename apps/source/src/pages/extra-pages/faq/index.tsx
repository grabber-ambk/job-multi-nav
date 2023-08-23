import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const FAQ = asyncComponent(() => import('../../../modules/extraPages/FAQ'));
export default AppPage(() => <FAQ />);
