import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import dynamic from 'next/dynamic'

const Chat = dynamic(() => import('../../../modules/apps/Chat'));
export default AppPage(() => <Chat />);
