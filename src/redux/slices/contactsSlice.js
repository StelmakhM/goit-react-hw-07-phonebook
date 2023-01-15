import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, removeContact } from "../operations";

const initialState = {
	items: [],
	isLoading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	extraReducers: {
		[fetchContacts.pending](state) {
			state.isLoading = true;
		},
		[fetchContacts.fulfilled](state, action) {
			state.isLoading = false;
			state.items = action.payload;
		},
		[fetchContacts.rejected](state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		[addContact.pending](state) {
			state.isLoading = true;
		},
		[addContact.fulfilled](state, action) {
			state.isLoading = false;
			state.items.unshift(action.payload);
		},
		[addContact.rejected](state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		[removeContact.pending](state) {
			state.isLoading = true;
		},
		[removeContact.fulfilled](state, action) {
			state.isLoading = false;
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			state.items.splice(index, 1);
		},
		[removeContact.rejected](state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const contactsReducer = contactsSlice.reducer;
