import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AddClient } from '@crema/modules/invoice';
import { isEmptyObject } from '@crema/helpers';
import { useAppDispatch, useAppSelector } from '../../../toolkit/hooks';
import { onGetClientDetail, onUpdateClient } from '../../../toolkit/actions';
import { ClientType } from '@crema/models/invoice';
import AppLoader from '@crema/components/AppLoader';

const EditClients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedClient = useAppSelector(
    ({ invoiceApp }) => invoiceApp.selectedClient
  );
  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    dispatch(onGetClientDetail(router.query?.all?.[0]));
  }, [dispatch, router.query.all]);

  const onSave = (client: ClientType) => {
    dispatch(onUpdateClient(client));
    router.push('/invoice/clients');
  };
  return loading ? (
    <AppLoader />
  ) : !isEmptyObject(selectedClient as ClientType) ? (
    <AddClient selectedClient={selectedClient as ClientType} onSave={onSave} />
  ) : null;
};

export default EditClients;
