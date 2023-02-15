import { createSlice } from "@reduxjs/toolkit" 
import { contactsInitState } from "./contacts.init-state"
import { addContactsThunk, deleteContactsThunk, fetchContactsThunk } from "./contacts.thunk";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitState,
    
    extraReducers: builder => {
        builder
            .addCase(fetchContactsThunk.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
                state.items = [...payload];
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            
            .addCase(deleteContactsThunk.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContactsThunk.fulfilled, (state, { payload }) => {
                state.items = state.items.filter(contact => contact.id !== payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteContactsThunk.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
            
            .addCase(addContactsThunk.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContactsThunk.fulfilled, (state, { payload }) => {
                state.items = [...state.items, payload];
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addContactsThunk.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
    }
})



export const contactsReducer = contactsSlice.reducer;