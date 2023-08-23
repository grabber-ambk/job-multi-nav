import {
  InvoiceType,
  ClientType,
  InvoiceSettingType,
  InvFolderType,
} from '@crema/models/invoice';
import { createReducer } from '@reduxjs/toolkit';
import {
  InvoiceDetailAction,
  InvoiceFolderAction,
  GetInvoiceListAction,
  GetInvoiceSettingsAction,
  GetClientAction,
  AddClientAction,
  UpdateClientAction,
  AddInvoiceAction,
  UpdateInvoiceAction,
  UpdateInvoiceSettingsAction,
  GetClientDetailAction,
} from './ActionTypes/Invoice';

const initialState: {
  invoiceList: InvoiceType[];
  invoiceSettings: InvoiceSettingType | null;
  clientsList: ClientType[];
  folderList: InvFolderType[];
  selectedInvoice: InvoiceType | null;
  selectedClient: ClientType | null;
} = {
  invoiceList: [],
  invoiceSettings: null,
  clientsList: [],
  folderList: [],
  selectedInvoice: null,
  selectedClient: null,
};

const invoiceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetInvoiceListAction, (state, action) => {
      state.invoiceList = action.payload;
    })
    .addCase(InvoiceDetailAction, (state, action) => {
      state.selectedInvoice = action.payload;
    })
    .addCase(InvoiceFolderAction, (state, action) => {
      state.folderList = action.payload;
    })
    .addCase(GetInvoiceSettingsAction, (state, action) => {
      state.invoiceSettings = action.payload;
    })
    .addCase(GetClientAction, (state, action) => {
      state.clientsList = action.payload;
    })
    .addCase(AddClientAction, (state, action) => {
      state.clientsList = action.payload;
    })
    .addCase(UpdateClientAction, (state, action) => {
      state.clientsList = action.payload;
    })
    .addCase(AddInvoiceAction, (state, action) => {
      state.invoiceList = [action.payload, ...state.invoiceList];
    })
    .addCase(UpdateInvoiceAction, (state, action) => {
      state.invoiceList = action.payload;
    })
    .addCase(UpdateInvoiceSettingsAction, (state, action) => {
      state.invoiceList = action.payload;
    })
    .addCase(GetClientDetailAction, (state, action) => {
      state.selectedClient = action.payload;
    });
});

export default invoiceReducer;
