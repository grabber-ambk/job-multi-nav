import React, { useEffect } from 'react';
import { InvoicePdf } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import { isEmptyObject } from '@crema/helpers';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetClientList,
  onGetInvoiceDetail,
  onGetInvoiceSettings,
} from '../../../toolkit/actions';
import { InvoiceSettingType, InvoiceType } from '@crema/models/invoice';

const InvoicePdfPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const invoiceSettings = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceSettings
  );
  const clientsList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.clientsList
  );
  const selectedInvoice = useAppSelector(
    ({ invoiceApp }) => invoiceApp.selectedInvoice
  );

  useEffect(() => {
    if (router.query?.all) {
      dispatch(onGetClientList());
      dispatch(onGetInvoiceSettings());
      dispatch(onGetInvoiceDetail(Number(router.query?.all?.[0])));
    }
  }, [dispatch, router.query?.all]);

  return clientsList?.length > 0 &&
    !isEmptyObject(invoiceSettings as InvoiceSettingType) &&
    !isEmptyObject(selectedInvoice as InvoiceType) ? (
    <InvoicePdf
      selectedInv={selectedInvoice as InvoiceType}
      clientsList={clientsList}
      invoiceSettings={invoiceSettings as InvoiceSettingType}
    />
  ) : null;
};

export default InvoicePdfPage;
