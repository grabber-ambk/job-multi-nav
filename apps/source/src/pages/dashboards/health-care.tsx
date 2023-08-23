import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';
import AppPageMeta from '@crema/components/AppPageMeta';

const HealthCare = asyncComponent(
  () => import('../../modules/dashboards/HealthCare')
);

export default AppPage(() => {
  return (
    <React.Fragment>
      <AppPageMeta title="Health Care | Crema " />
      <HealthCare />
    </React.Fragment>
  );
});
