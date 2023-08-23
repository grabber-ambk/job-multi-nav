import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const ReactDropzone = dynamic(
  () => import('../../../modules/thirdParty/reactDropzone'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <ReactDropzone />);
