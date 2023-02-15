import { configureStore } from "@reduxjs/toolkit"
import { authInitState } from "./auth/auth.init-state"
import { authReducer } from "./auth/auth.slice"
import { contactsInitState } from "./contacts/contacts.init-state"
import { contactsReducer } from "./contacts/contacts.slice"
import { filterInitState } from "./filter/filter.init-state"
import { filterReducer } from "./filter/filter.slice"

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'auth',
    storage,
  whitelist: ['token'],
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const initState = {
    auth: authInitState,
    contacts: contactsInitState,
    filter: filterInitState,
}

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        contacts: contactsReducer,
        filter: filterReducer,
    },
    middleware: [thunk],
    devTools: true,
    preloadedState: initState,
})

export const persistor = persistStore(store)