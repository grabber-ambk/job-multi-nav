import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const EditBlog = asyncComponent(
  () => import('../../../../modules/extraPages/Blog/EditBlog')
);
export default AppPage(() => <EditBlog />);
