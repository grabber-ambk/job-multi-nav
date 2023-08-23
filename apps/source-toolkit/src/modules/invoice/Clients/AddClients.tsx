import React from 'react';
import { useRouter } from 'next/router';
import { AddClient } from '@crema/modules/invoice';
import { onAddClient } from '../../../toolkit/actions';
import { useAppDispatch } from '../../../toolkit/hooks';
import { ClientType } from '@crema/models/invoice';

const AddClients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSave = (client: ClientType) => {
    dispatch(onAddClient(client));
    router.push('/invoice/clients');
  };

  return <AddClient onSave={onSave} />;
};

export default AddClients;
