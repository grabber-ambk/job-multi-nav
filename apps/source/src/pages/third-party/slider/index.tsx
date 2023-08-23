import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const TimeLine = dynamic(
  () => import('../../../modules/thirdParty/reactSlick'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <TimeLine />);
