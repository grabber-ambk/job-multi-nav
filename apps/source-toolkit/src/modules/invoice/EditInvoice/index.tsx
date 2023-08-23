import React, { useEffect } from 'react';
import { AddInvoice } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import {
  onGetClientList,
  onGetInvoiceList,
  onGetInvoiceSettings,
  onGetInvoiceDetail,
  onUpdateInvoice,
} from '../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import AppLoader from '@crema/components/AppLoader';
import { InvoiceSettingType, InvoiceType } from '@crema/models/invoice';

const EditInvoicePage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const invoiceSettings = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceSettings
  );
  const clientsList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.clientsList
  );
  const invoiceList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceList
  );
  const selectedInvoice = useAppSelector(
    ({ invoiceApp }) => invoiceApp.selectedInvoice
  );
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetInvoiceList({ folder: undefined, page: 0 }));
    dispatch(onGetClientList());
    dispatch(onGetInvoiceSettings());
    if (router.query?.all?.[0])
      onGetInvoiceDetail(Number(router.query?.all?.[0]));
  }, [dispatch, router.query?.all]);

  const onSave = (invoice: InvoiceType) => {
    dispatch(onUpdateInvoice(invoice));

    router.push('/invoice/home');
  };

  return loading ? (
    <AppLoader />
  ) : clientsList && invoiceList?.length ? (
    <AddInvoice
      selectedInv={selectedInvoice as InvoiceType}
      clientsList={clientsList}
      totalCount={invoiceList?.length || 0}
      invoiceSettings={invoiceSettings as InvoiceSettingType}
      onSave={onSave}
    />
  ) : null;
};

export default EditInvoicePage;
