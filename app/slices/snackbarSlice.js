import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const SnackbarSlice = createSlice({
	name: "snackbar",
	initialState: {
		isVisible: false,
		title: "",
		type: "",
	},
	reducers: {
		showSnackbar: (state, { payload }) => {
			state.isVisible = true;
			state.title = payload.title;
			state.type = payload.type;
		},
		hideSnackbar: (state) => {
			state.isVisible = false;
			state.title = "";
			state.type = "";
		},
	},
});

export const { showSnackbar, hideSnackbar } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;
