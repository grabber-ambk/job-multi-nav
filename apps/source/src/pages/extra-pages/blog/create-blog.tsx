import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const CreateBlog = asyncComponent(
  () => import('../../../modules/extraPages/Blog/CreateBlog')
);
export default AppPage(() => <CreateBlog />);
