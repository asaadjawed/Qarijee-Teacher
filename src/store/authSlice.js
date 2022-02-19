import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    email: null,
    token: null,
    error: null,
    name: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.token = action.payload.jwt;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
