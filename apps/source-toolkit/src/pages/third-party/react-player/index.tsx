import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(
  () => import('../../../modules/thirdParty/reactPlayer'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <ReactPlayer />);
