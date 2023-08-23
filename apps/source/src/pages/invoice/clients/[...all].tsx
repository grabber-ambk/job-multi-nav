import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const EditClients = asyncComponent(
  () => import('../../../modules/invoice/Clients/EditClients')
);
export default AppPage(() => <EditClients />);
