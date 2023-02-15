import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from "react-redux";
import { addContactsThunk } from "redux/contacts/contacts.thunk";

const StyledForm = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: space-between;

gap: 4px;
width: 300px;

    input {
        display: flex;
        width: 210px;
        flex-direction: column;
        border: 1px solid silver;
        border-radius: 4px;

        &:hover,
        &:focus  {
        outline: none;
        border: 1px solid skyblue;
        }
    }
    button {
    margin-left: auto;
    background-color: #fff;
    padding: 5px 10px;
    border: 1px solid silver;
    border-radius: 4px;

    &:hover,
    &:focus  {
      outline: none;
      border: 1px solid skyblue;
    }
  }
`

export const ContactForm = () => {

  const contacts = useSelector(state => state.contacts.items)
  const dispatch = useDispatch();

  const nameInpudId = nanoid();
  const numberInpudId = nanoid();
  
  const [name, setName] = useState("");
  const [number, setNumber] = useState("")

  const onInputChange = (event) => {
    switch (event.target.name) {
      case "name": setName(event.target.value);
        break;
      case "number": setNumber(event.target.value);
        break;
      default: return;
    }
  }

  const normalizedName = name.toLowerCase();

  const handleSubmit = (event) => {
    event.preventDefault();
    contacts.find(contact => contact.name.toLowerCase() === normalizedName) 
      ? alert(`${name} is already in contacts `) 
      : dispatch(addContactsThunk({ id: nanoid(), name: name, number: number }))
    setName("");
    setNumber("");
  }

    return(
        <StyledForm onSubmit={handleSubmit}>
    <label htmlFor={nameInpudId}>Name </label>
    <input
      type="text"
      name="name"
      id={nameInpudId}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      value={name}
      onChange={onInputChange}
      required
        />
    <label htmlFor={numberInpudId}>Number </label>    
    <input
      type="tel"
          name="number"
          id={numberInpudId}
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
      onChange={onInputChange}
      required
    />

        <button type="submit">Add contact</button>
        
    </StyledForm>)
}