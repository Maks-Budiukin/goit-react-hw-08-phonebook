import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchContactsThunk = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      
        return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
});

export const addContactsThunk = createAsyncThunk("contacts/addContact", async (data, thunkAPI) => {
    
  try {
    const response = await axios({
        method: 'post',
        url: `/contacts`,
              data
        });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
  
});

export const editContactsThunk = createAsyncThunk("contacts/editContact", async (editData, thunkAPI) => {
    try {
        const response = await axios({
        method: 'patch',
        url: `/contacts/${editData.id}`,
          data: {
            name: editData.name,
            number: editData.number}
        });
        return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
});

export const deleteContactsThunk = createAsyncThunk("contacts/deleteContact", async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`/contacts/${id}`);
        return response.data.id;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
});