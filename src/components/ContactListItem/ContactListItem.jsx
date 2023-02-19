import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { deleteContactsThunk, editContactsThunk } from "redux/contacts/contacts.thunk"
import styled from "styled-components";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx"
import { GrEdit } from "react-icons/gr"

const Tick = styled(MdDone)`
    margin-bottom: 4px;
`

const StyledForm = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;

gap: 4px;
width: 300px;

    input {
        display: flex;
        width: 110px;
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
        /* display: inline-block; */
    margin-left: auto;
    margin-right: 4px;
    background-color: #fff;
    /* padding: 5px 10px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid silver;
    border-radius: 4px;

    &:hover,
    &:focus  {
      outline: none;
      border: 1px solid skyblue;
      color: skyblue;
    }
  }
`



export const ContactListItem = ({ name, number, id }) => {
    const [editForm, setEditForm] = useState(null);
    const [editName, setEditName] = useState("");
    const [editNumber, setEditNumber] = useState("")

    const dispatch = useDispatch();

    const nameInpudId = nanoid();
    const numberInpudId = nanoid();

    const deleteHandler = (id) => {
        dispatch(deleteContactsThunk(id))
    }

    const editHandler = () => {
        setEditForm(name);
        setEditName(name);
        setEditNumber(number);
    }

    const handleEditSubmit = () => {
        dispatch(editContactsThunk({ id, name: editName, number: editNumber }))
        setEditForm(null);
    }

    const onEditInputChange = (event) => {
    switch (event.target.name) {
      case "name": setEditName(event.target.value);
        break;
      case "number": setEditNumber(event.target.value);
        break;
      default: return;
    }
    }

    return (editForm
        ? (<StyledForm onSubmit={handleEditSubmit}>
    <label htmlFor={nameInpudId}></label>
    <input
      type="text"
      name="name"
      id={nameInpudId}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      value={editName}
      onChange={onEditInputChange}
      required
        />
    <label htmlFor={numberInpudId}></label>    
    <input
      type="tel"
          name="number"
          id={numberInpudId}
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={editNumber}
      onChange={onEditInputChange}
      required
    />

        <button type="submit"><Tick/></button>
        
    </StyledForm>)
        : < li key={id} > {name} < span > {number}</span > <button onClick={() => editHandler(id)}><GrEdit/></button> <button onClick={() => deleteHandler(id)}><RxCross2/></button></li >)
}