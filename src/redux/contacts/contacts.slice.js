import { createSlice } from "@reduxjs/toolkit" 
import { contactsInitState } from "./contacts.init-state"
import { addContactsThunk, deleteContactsThunk, fetchContactsThunk } from "./contacts.thunk";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitState,
    
    extraReducers: builder => {
        builder
            .addCase(fetchContactsThunk.pending, state => ({...state, isLoading: true}))
            .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => ({ ...state, items: [...payload], isLoading: false }))
            .addCase(fetchContactsThunk.rejected, (state, { payload }) => ({...state, error: payload, isLoading: false}))
            
            .addCase(deleteContactsThunk.pending, state => ({...state, isLoading: true}))
            .addCase(deleteContactsThunk.fulfilled, (state, { payload }) => ({...state, items: (state.items.filter(contact => contact.id !== payload)), isLoading: false}))
            .addCase(deleteContactsThunk.rejected, (state, { payload }) => ({...state, error: payload, isLoading: false}))
            
            .addCase(addContactsThunk.pending, state => ({...state, isLoading: true}))
            .addCase(addContactsThunk.fulfilled, (state, { payload }) => ({...state, items: [...state.items, payload], isLoading: false}))
            .addCase(addContactsThunk.rejected, (state, { payload }) => ({...state, error: payload, isLoading: false}))
    }
})

export const { contactsAdd, contactsDelete } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;