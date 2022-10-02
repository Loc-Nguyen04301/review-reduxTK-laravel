import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const registerAuth = createAsyncThunk(
  "auth/registerAuth",
  async (formField) => {
    const res = await AuthService.register(formField);
    console.log(res);
    return res.data.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
