import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReviewService from "../services/ReviewService";
export const createReview = createAsyncThunk(
  "reviews/create",
  async (formField) => {
    const res = await ReviewService.create(formField);
    console.log(res);
    return res.data.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    name: "",
    email: "",
    title: "",
    description: "",
    ratedValue: null,
    base64Image: [],
  },
  reducers: {
    ChangeName: (state, action) => {
      state.name = action.payload;
    },
    ChangeEmail: (state, action) => {
      state.email = action.payload;
    },
    ChangeTitle: (state, action) => {
      state.title = action.payload;
    },
    ChangeDescription: (state, action) => {
      state.description = action.payload;
    },
    ChangeRatedValue: (state, action) => {
      state.ratedValue = action.payload;
    },
    ChangeBase64Image: (state, action) => {
      state.base64Image = [...state.base64Image, action.payload];
    },
    RemoveBase64Image: (state, action) => {
      state.base64Image = state.base64Image.filter(
        (item, index) => index !== action.payload
      );
    },
  },
  extraReducers: {},
});

const reviewListSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {},
  extraReducers: {
    [createReview.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

export const reviewReducer = reviewSlice.reducer;
export const reviewListReducer = reviewListSlice.reducer;
export const {
  ChangeName,
  ChangeEmail,
  ChangeTitle,
  ChangeDescription,
  ChangeRatedValue,
  ChangeBase64Image,
  RemoveBase64Image,
} = reviewSlice.actions;
