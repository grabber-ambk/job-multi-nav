import React from 'react';
import AppPage from '../../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const BlogDetails = asyncComponent(
  () => import('../../../../modules/extraPages/Blog/BlogDetail')
);
export default AppPage(() => <BlogDetails />);
