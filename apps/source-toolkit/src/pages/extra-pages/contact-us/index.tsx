import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AsyncLoaderComponent';

const ContactUs = asyncComponent(
  () => import('../../../modules/extraPages/ContactUs')
);
export default AppPage(() => <ContactUs />);
