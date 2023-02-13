import { configureStore } from "@reduxjs/toolkit"
import { contactsInitState } from "./contacts/contacts.init-state"
import { contactsReducer } from "./contacts/contacts.slice"
import { filterInitState } from "./filter/filter.init-state"
import { filterReducer } from "./filter/filter.slice"

const initState = {
    contacts: contactsInitState,
    filter: filterInitState,
}

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filter: filterReducer,
    },
    devTools: true,
    preloadedState: initState,
})