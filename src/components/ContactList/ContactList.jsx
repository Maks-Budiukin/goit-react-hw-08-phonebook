import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactsThunk, fetchContactsThunk } from "redux/contacts/contacts.thunk";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  width: 300px;
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px;
    font-weight: bold;
  }

  button {
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
  li span {
    color: black;
    display: inline-block;
    margin-left: auto;
    margin-right: 8px;
    font-weight: normal;
  }

`

export const ContactList = () => {

  const contacts = useSelector(state => state.contacts.items);
 
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk())
  }, [dispatch])

 
  
  const deleteHandler = (id) => {
    dispatch(deleteContactsThunk(id))
  }

  const normalizedFilter = filter.toLowerCase().trim();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

  return (
    <StyledList>
      {filteredContacts.map((item) => {
        return(<li key={item.id}>{item.name} <span>{item.number}</span> <button onClick={() => deleteHandler(item.id)}>Del</button></li>)
      })}
    </StyledList>
  )
}