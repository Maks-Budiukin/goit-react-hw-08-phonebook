import React, { useEffect, lazy} from "react";

import { useDispatch, useSelector } from "react-redux";
import { refreshThunk } from "redux/auth/auth.thunk";
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import { HomeScreen } from "./HomeScreen/HomeScreen";
import { RestrictedRoute } from "./Routes/RestrictedRoute";
import { PrivateRoute } from "./Routes/PrivateRoute";


const ContactsPage = lazy(() => import("../Pages/ContactsPage/ContactsPage"));
const RegPage = lazy(() => import("../Pages/RegPage/RegPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage/LoginPage"));

export const App = () => {
  
  // const error = useSelector(state => state.contacts.error)
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token)
 

  useEffect(() => {
    if (token) {
      dispatch(refreshThunk());
    }
  }, [dispatch, token])
  
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/login" element={<RestrictedRoute component={LoginPage} redirectTo={'/contacts'} />} />
          <Route path="/register" element={<RestrictedRoute component={RegPage} redirectTo={'/contacts'} />} />
          <Route path="/contacts" element={<PrivateRoute component={ContactsPage} redirectTo={'/'} />} />
        </Route>

      </Routes>
      </>
   )
}