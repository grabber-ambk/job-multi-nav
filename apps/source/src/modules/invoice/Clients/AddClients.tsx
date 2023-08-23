import React from 'react';
import { useRouter } from 'next/router';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { AddClient } from '@crema/modules/invoice';
import { postDataApi } from '@crema/hooks/APIHooks';
import { ClientType } from '@crema/models/invoice';

const AddClients = () => {
  const router = useRouter();
  const infoViewActionsContext = useInfoViewActionsContext();

  const onSave = (client: ClientType) => {
    postDataApi('/api/invoice/clients/add', infoViewActionsContext, {
      client,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          'New Client has been created successfully!'
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice/clients');
  };

  return <AddClient onSave={onSave} />;
};

export default AddClients;
