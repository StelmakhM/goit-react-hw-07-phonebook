import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://63c467e6a90856357536b245.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (_, thunkAPI) => {
	try {
		const response = await fetch(`${BASE_URL}/contacts`);
		return await response.json();
	} catch (error) {
		return thunkAPI.rejectWithValue(error.massage);
	}
});

export const addContact = createAsyncThunk("contacts/addContact", async (text, thunkAPI) => {
	try {
		const response = await fetch(`${BASE_URL}/contacts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(text),
		});
		return await response.json();
	} catch (error) {
		return thunkAPI.rejectWithValue(error.massage);
	}
});

export const removeContact = createAsyncThunk("contacts/removeContact", async (id, thunkAPI) => {
	try {
		const response = await fetch(`${BASE_URL}/contacts/${id}`, { method: "DELETE" });
		return await response.json();
	} catch (error) {
		return thunkAPI.rejectWithValue(error.massage);
	}
});
