import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "https://63e7b5aacbdc5658737c047f.mockapi.io/contacts";


export const fetchContactsThunk = createAsyncThunk("contacts/fetchAll", async () => {
    const response = await axios.get("/contacts");
  return response.data;
});

export const deleteContactsThunk = createAsyncThunk("contacts/deleteContact", async (id) => {
    const response = await axios.delete(`/contacts/${id}`);
  return response.data.id;
});

export const addContactsThunk = createAsyncThunk("contacts/addContact", async (data) => {
    
  const response = await axios({
  method: 'post',
  url: '/contacts',
        data
  });
    return response.data;
  
});