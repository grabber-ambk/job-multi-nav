import React from 'react';

import asyncComponent from '@crema/components/AsyncLoaderComponent';
import AppPage from '../../../core/AppLayout/AppPage';

const InvoicePdf = asyncComponent(
  () => import('../../../modules/invoice/InvoicePdf')
);
export default AppPage(() => <InvoicePdf />);
