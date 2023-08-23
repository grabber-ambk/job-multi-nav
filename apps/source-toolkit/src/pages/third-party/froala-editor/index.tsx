import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import AppLoader from '@crema/components/AppLoader';
import dynamic from 'next/dynamic';

const FroalaEditor = dynamic(
  () => import('../../../modules/thirdParty/froalaEditor'),
  { loading: () => <AppLoader />, ssr: false }
);
export default AppPage(() => <FroalaEditor />);
