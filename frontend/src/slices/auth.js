import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const loginAuth = createAsyncThunk("auth/loginAuth", async (values) => {
  const res = await AuthService.login(values);
  console.log(res);
  return res.data;
});

export const registerAuth = createAsyncThunk(
  "auth/registerAuth",
  async (values) => {
    const res = await AuthService.login(values);
    console.log(res);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: '',
    user: {},
  },
  extraReducers: {
    [loginAuth.fulfilled]: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
    },
  },
});

export default authSlice.reducer;
