import React from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import styled from "styled-components";
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from "react-redux";

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

  return (
      <Wrapper>
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