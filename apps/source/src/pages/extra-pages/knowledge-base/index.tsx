import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const KnowledgeBase = asyncComponent(
  () => import('../../../modules/extraPages/KnowledgeBase')
);
export default AppPage(() => <KnowledgeBase />);
