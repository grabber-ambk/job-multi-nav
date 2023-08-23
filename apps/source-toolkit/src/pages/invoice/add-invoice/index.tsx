import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const AddInvoice = asyncComponent(
  () => import('../../../modules/invoice/AddInvoice')
);
export default AppPage(() => <AddInvoice />);
