import { createSlice } from "@reduxjs/toolkit" 
import { contactsInitState } from "./contacts.init-state"
import { addContactsThunk, deleteContactsThunk, editContactsThunk, fetchContactsThunk } from "./contacts.thunk";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitState,
    
    extraReducers: builder => {
        builder
            
            // ============== FETCH =================

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
            
            // ============== DELETE =================

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
            
            // ============== ADD =================

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
        // ============== EDIT =================
            
            .addCase(editContactsThunk.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editContactsThunk.fulfilled, (state, { payload }) => {
                state.items = state.items.map(item => item.id === payload.id ? payload : item)

                // array: state.array.map(n => n.id === action.newObject.id ? action.newObject : n),
                    
                state.isLoading = false;
                state.error = null;
            })
            .addCase(editContactsThunk.rejected, (state, { payload }) => {
                state.error = payload;
                state.isLoading = false;
            })
    }
})



export const contactsReducer = contactsSlice.reducer;