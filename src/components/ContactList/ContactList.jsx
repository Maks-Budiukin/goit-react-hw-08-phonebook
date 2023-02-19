import { Filter } from "components/Filter/Filter";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsThunk } from "redux/contacts/contacts.thunk";
import styled from "styled-components";
import { ContactListItem } from "components/ContactListItem/ContactListItem";

const StyledList = styled.ul`
  list-style: none;
  width: 300px;
  padding: 0;
  li {
    display: flex;
    gap: 4px;
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

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContactList = () => {

  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    isLoggedIn && dispatch(fetchContactsThunk())
  }, [dispatch, isLoggedIn])

  const normalizedFilter = filter.toLowerCase().trim();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

  return (
    <StyledList>
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
      {filteredContacts.map((item) => {
        return (<ContactListItem key={item.id} name={item.name} number={item.number} id={item.id} />)
      })}
    </StyledList>
  )
}