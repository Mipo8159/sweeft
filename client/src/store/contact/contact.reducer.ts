import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CreateContactDto} from './dto/create_contact.dto'
import {ContactInterface} from './types/contact.interface'
import {ContactState} from './types/contact_state.interface'

const initialState: ContactState = {
  contacts: [
    {name: 'Giga', phone: 5792003373},
    {name: 'Bela', phone: 591203070},
    {name: 'Mari', phone: 555051020},
    {name: 'Bekha', phone: 577223344},
    {name: 'David', phone: 598807788},
  ],
  contact: null,
  error: null,
  filtered: [],
}

export const contactReducer = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // ADDS CONTACT TO LIST
    addContact(
      state: ContactState,
      action: PayloadAction<CreateContactDto>
    ) {
      const obj: ContactInterface = {
        name: action.payload.name,
        phone: Number(action.payload.phone),
      }
      const inContacts = state.contacts.some(
        (c) => c.phone === Number(obj.phone)
      )

      if (!inContacts) {
        state.contacts = [...state.contacts, obj]
        state.filtered = [...state.filtered, obj]
      } else {
        state.error = 'Number already exists'
      }
    },

    // REMOVES CONTACT FROM LIST
    removeContact(state: ContactState, action: PayloadAction<number>) {
      const filtered = state.contacts.filter(
        (c) => c.phone !== Number(action.payload)
      )
      state.contacts = filtered
    },

    // UPDATES CONTACT LIST
    updateContact(
      state: ContactState,
      action: PayloadAction<{number: number; data: CreateContactDto}>
    ) {
      const obj: ContactInterface = {
        name: action.payload.data.name,
        phone: Number(action.payload.data.phone),
      }

      const filtered = state.contacts.filter(
        (c) => c.phone !== Number(action.payload.number)
      )

      state.contacts = [...filtered, obj]
      state.filtered = [
        ...state.filtered.filter(
          (f) => f.phone !== Number(action.payload.data.phone)
        ),
        obj,
      ]
    },

    // SETS CONTACTS ON REFRESH
    setContacts(
      state: ContactState,
      action: PayloadAction<ContactInterface[]>
    ) {
      state.contacts = action.payload
    },

    // FINDS CONTACT FROM LIST
    findContact(state: ContactState, action: PayloadAction<number>) {
      const contact = state.contacts.find(
        (c) => c.phone === action.payload
      )
      if (contact) {
        state.contact = contact
      }
    },

    // SEARCH CONTACTS
    searchContacts(state: ContactState, action: PayloadAction<string>) {
      const filtered = state.contacts.filter(
        (c) =>
          c.name
            .toLocaleLowerCase()
            .includes(String(action.payload).toLocaleLowerCase()) ||
          String(c.phone).includes(
            String(action.payload).toLocaleLowerCase()
          )
      )

      if (filtered.length > 0) {
        state.filtered = filtered
      } else {
        state.filtered = []
      }
    },
  },
})

export const {
  addContact,
  removeContact,
  updateContact,
  setContacts,
  findContact,
  searchContacts,
} = contactReducer.actions
export default contactReducer.reducer
