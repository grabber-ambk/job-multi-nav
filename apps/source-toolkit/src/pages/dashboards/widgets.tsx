import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const Widgets = asyncComponent(
  () => import('../../modules/dashboards/Widgets')
);
export default AppPage(() => <Widgets />);
