import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const CRM = asyncComponent(() => import('../../modules/dashboards/CRM'));
export default AppPage(() => <CRM />);
