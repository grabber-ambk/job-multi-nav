import {
  GET_INVOICE_LIST,
  GET_INVOICE_DETAIL,
  GET_INVOICE_FOLDER_LIST,
  GET_INVOICE_SETTINGS,
  GET_CLIENT_LIST,
  ADD_NEW_CLIENTS,
  UPDATE_CLIENTS,
  ADD_NEW_INVOICE,
  UPDATE_INVOICE_SETTINGS,
  UPDATE_INVOICE,
  GET_CLIENT_DETAIL,
} from '@crema/actions/Invoice.action';
import { createAction } from '@reduxjs/toolkit';

import {
  InvoiceType,
  ClientType,
  InvoiceSettingType,
  InvFolderType,
} from '@crema/models/invoice';

export const GetInvoiceListAction =
  createAction<InvoiceType[]>(GET_INVOICE_LIST);

export const InvoiceDetailAction =
  createAction<InvoiceType>(GET_INVOICE_DETAIL);

export const InvoiceFolderAction = createAction<InvFolderType[]>(
  GET_INVOICE_FOLDER_LIST
);

export const GetInvoiceSettingsAction =
  createAction<InvoiceSettingType>(GET_INVOICE_SETTINGS);

export const GetClientAction = createAction<ClientType[]>(GET_CLIENT_LIST);

export const AddClientAction = createAction<ClientType[]>(ADD_NEW_CLIENTS);

export const UpdateClientAction = createAction<ClientType[]>(UPDATE_CLIENTS);

export const AddInvoiceAction = createAction<InvoiceType>(ADD_NEW_INVOICE);

export const UpdateInvoiceAction = createAction<InvoiceType[]>(UPDATE_INVOICE);

export const UpdateInvoiceSettingsAction = createAction<InvoiceType[]>(
  UPDATE_INVOICE_SETTINGS
);
export const GetClientDetailAction =
  createAction<ClientType>(GET_CLIENT_DETAIL);
