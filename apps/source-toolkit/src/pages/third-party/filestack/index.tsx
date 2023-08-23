import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const FileStack = dynamic(
  () => import('../../../modules/thirdParty/filestack'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <FileStack />);
