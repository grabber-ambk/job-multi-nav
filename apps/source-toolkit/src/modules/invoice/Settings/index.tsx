import React, { useEffect } from 'react';
import { InvoiceSettings } from '@crema/modules/invoice';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetInvoiceSettings,
  onUpdateSettings,
} from '../../../toolkit/actions';
import { InvoiceSettingItem, InvoiceSettingType } from '@crema/models/invoice';

const InvoiceSettingsPage = () => {
  const dispatch = useAppDispatch();
  const invoiceSettings = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceSettings
  );

  useEffect(() => {
    dispatch(onGetInvoiceSettings());
  }, [dispatch]);

  const updateSettings = (key: string, newSettings: InvoiceSettingItem) => {
    const settings: Partial<InvoiceSettingType> = {
      ...invoiceSettings,
      [key]: newSettings,
    };

    dispatch(onUpdateSettings(settings));
  };

  return (
    <InvoiceSettings
      defaultSettings={invoiceSettings as InvoiceSettingType}
      onUpdateSettings={updateSettings}
    />
  );
};

export default InvoiceSettingsPage;
