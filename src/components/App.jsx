import React, { useEffect} from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import styled from "styled-components";
import { RotatingLines } from 'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegPage } from "./RegPage/RegPage";
import { logoutThunk, refreshThunk } from "redux/auth/auth.thunk";
import { Routes, Route } from "react-router-dom";

const Wrapper = styled.div`
  width: 300px;
  margin-left: 50px;
  h1 {
    font-size: 2.1em;
    text-align: right;
  }
  h2 {
    font-size: 2.1em;
    font-weight: 700;
  }
  span {
    color: skyblue;
  }
`

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const App = () => {
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error)
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token)
 

  useEffect(() => {
    if (token) {
      dispatch(refreshThunk());
    }
  }, [dispatch, token])
  
  return (
    <Wrapper>
      <button type="button" onClick={() => dispatch(logoutThunk())}>Log Out</button>
      <LoginPage />
      <RegPage />
      {error && <p>{error}</p>}
      <h1><span>P</span>honebook</h1>
      <ContactForm />
      <LoadingWrapper>
        <h2>Contact<span>s</span></h2>
        {isLoading && <RotatingLines
          strokeColor="skyblue"
          strokeWidth="5"
          animationDuration="0.75"
          width="28"
          visible={true}
        />}
      </LoadingWrapper>
      <Filter />
      <ContactList />
      </Wrapper>
   )
}