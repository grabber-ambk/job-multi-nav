import React from 'react';

import asyncComponent from '@crema/components/AsyncLoaderComponent';
import AppPage from '../../core/AppLayout/AppPage';

const Invoice = asyncComponent(() => import('../../modules/invoice/Listing'));
export default AppPage(() => <Invoice />);
