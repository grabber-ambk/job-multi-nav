import { createReducer } from '@reduxjs/toolkit';
import {
  ContactObjType,
  FolderType,
  LabelType,
} from '@crema/models/apps/Contact';
import {
  ContactListAction,
  ContactFolderListAction,
  ToggleContactAction,
  ContactLabelAction,
  CreateNewAction,
  DeleteAction,
  UpdateContactAction,
  UpdateContactStaredAction,
  UpdateContactDetailsAction,
} from './ActionTypes/Contact';

const initialState: {
  contactList: ContactObjType[];
  totalContacts: number;
  contactDrawer: boolean;
  labelList: LabelType[];
  folderList: FolderType[];
  selectedContact: ContactObjType | null;
} = {
  contactList: [],
  totalContacts: 0,
  contactDrawer: false,
  labelList: [],
  folderList: [],
  selectedContact: null,
};

const contactReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ContactListAction, (state, action) => {
      state.contactList = action.payload.data;
      state.totalContacts = action.payload.count;
    })
    .addCase(ContactFolderListAction, (state, action) => {
      state.folderList = action.payload;
    })
    .addCase(ToggleContactAction, (state, action) => {
      state.contactDrawer = !state.contactDrawer;
    })
    .addCase(ContactLabelAction, (state, action) => {
      state.labelList = action.payload;
    })
    .addCase(CreateNewAction, (state, action) => {
      state.contactList = [action.payload, ...state.contactList];
      state.totalContacts = state.totalContacts + 1;
    })
    .addCase(DeleteAction, (state, action) => {
      state.contactList = action.payload.data;
      state.totalContacts = action.payload.count;
    })
    .addCase(UpdateContactAction, (state, action) => {
      const contactIds = action.payload.data.map((contact) => contact.id);
      const updatedList = state.contactList.map((contact) => {
        if (contactIds.includes(contact.id)) {
          return action.payload.data.find(
            (selectedContact) => selectedContact.id === contact.id
          );
        } else {
          return contact;
        }
      });
      const filteredList =
        action.payload.labelName === 'label'
          ? updatedList.filter(
              (item) => item?.label !== action.payload.labelType
            )
          : updatedList;

      state.contactList = filteredList as ContactObjType[];
      state.totalContacts = filteredList.length;
    })
    .addCase(UpdateContactStaredAction, (state, action) => {
      const contactIds = action.payload.data.map((contact) => contact.id);
      const updatedList = state.contactList.map((contact) => {
        if (contactIds.includes(contact.id)) {
          return action.payload.data.find(
            (selectedContact) => selectedContact.id === contact.id
          );
        } else {
          return contact;
        }
      });
      const filteredList =
        action.payload.folderName === 'starred'
          ? updatedList.filter((item) => item?.isStarred)
          : updatedList;
      const total =
        action.payload.folderName === 'starred'
          ? state.totalContacts - action.payload.data.length
          : state.totalContacts;

      state.contactList = filteredList as ContactObjType[];
      state.totalContacts = total;
    })
    // .addCase(GET_CONTACT_DETAIL, (state, action) => {
    //   state.selectedContact = action.payload;
    // })
    .addCase(UpdateContactDetailsAction, (state, action) => {
      state.selectedContact = action.payload;
      state.contactList = state.contactList.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    });
});

export default contactReducer;
