import { createSlice } from "@reduxjs/toolkit" 
import { filterInitState } from "./filter.init-state"

const filterSlice = createSlice({
    name: "filter",
    initialState: filterInitState,
    reducers: {
        contactsFilter: (state, { payload }) => payload,
    }
})

export const {contactsFilter} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;