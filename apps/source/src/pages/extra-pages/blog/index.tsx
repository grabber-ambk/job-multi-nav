import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Blog = asyncComponent(() => import('../../../modules/extraPages/Blog'));
export default AppPage(() => <Blog />);
