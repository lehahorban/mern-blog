import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, currentUser } from "./authOperations";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.status = payload.message;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.message;
    },

    // Login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = payload.token;
      state.status = payload.message;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.message;
    },

    // Current user

    [currentUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [currentUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload?.user;
      state.token = payload?.token;
      state.status = null;
    },
    [currentUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.message;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
