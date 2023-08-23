import React, { useEffect, useState } from 'react';
import InvContentHeader from './InvContentHeader';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import { InvoiceTable } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import { onGetInvoiceList, onUpdateInvoice } from '../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { InvoiceType } from '@crema/models/invoice';

const InvoiceList = () => {
  const { asPath, query } = useRouter();
  const { all } = query;

  let folder = '';

  if (all && all.length === 2) {
    folder = all[1];
  }

  const dispatch = useAppDispatch();
  const loading = useAppSelector(({ common }) => common.loading);

  const [page, setPage] = useState(0);

  const invoiceList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceList
  );

  useEffect(() => {
    dispatch(onGetInvoiceList({ folder: folder, page: page }));
  }, [dispatch, page, folder, asPath]);

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };
  const [filterText, onSetFilterText] = useState('');

  const [checkedInvs, setCheckedInvs] = useState<number[]>([]);

  const onChangeStatus = (invoice: InvoiceType, status: number) => {
    dispatch(onUpdateInvoice({ ...invoice, folderValue: status }));
  };
  return (
    <>
      <AppsHeader>
        <InvContentHeader
          page={page}
          invoiceList={invoiceList || []}
          checkedInvs={checkedInvs}
          setCheckedInvs={setCheckedInvs}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
        />
      </AppsHeader>
      <AppsContent>
        <InvoiceTable
          invoiceData={invoiceList || []}
          loading={loading}
          onChangeStatus={onChangeStatus}
        />
      </AppsContent>
    </>
  );
};

export default InvoiceList;
