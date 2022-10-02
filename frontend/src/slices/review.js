import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReviewService from "../services/ReviewService";

export const retrieveOneReview = createAsyncThunk(
  "review/retrieveOne",
  async ({ id }) => {
    const res = await ReviewService.readOne(id);
    console.log(res);
    return res.data.data;
  }
);

export const retrieveReviews = createAsyncThunk(
  "review/retrieveAll",
  async () => {
    const res = await ReviewService.readAll();
    console.log(res);
    return res.data.data;
  }
);

export const findBySearch = createAsyncThunk(
  "review/findBySearch",
  async ({ search }) => {
    const res = await ReviewService.readAllBySearch(search);
    console.log(res);
    return res.data.data;
  }
);

export const updateReview = createAsyncThunk(
  "review/update",
  async ({ id, data }) => {
    const res = await ReviewService.update(id, data);
    console.log(res);
    return res.data.data;
  }
);

export const deleteReview = createAsyncThunk(
  "review/delete",
  async ({ id }) => {
    const res = await ReviewService.remove(id);
    console.log(res);
  }
);

export const deleteAllReview = createAsyncThunk(
  "review/deleteAll",
  async () => {
    const res = await ReviewService.removeAll();
    console.log(res);
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    currentReview: {},
  },
  reducers: {
    setCurrentReview: (state, action) => {
      state.currentReview = action.payload;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // if the promise resolved successfully,
    // dispatch the fulfilled action with the promise value as action.payload

    [retrieveOneReview.fulfilled]: (state, action) => {
      state.currentReview = { ...action.payload };
    },
    [retrieveReviews.fulfilled]: (state, action) => {
      state.reviews = [...action.payload];
    },
    [findBySearch.fulfilled]: (state, action) => {
      state.reviews = [...action.payload];
    },
    [updateReview.fulfilled]: (state, action) => {
      state.reviews[action.payload.id] = {
        ...action.payload,
      };
    },
    [deleteReview.fulfilled]: (state, action) => {
      let index = state.reviews.findIndex(({ id }) => id === action.payload.id);
      state.reviews.splice(index, 1);
    },
    [deleteAllReview.fulfilled]: (state, action) => {
      state.reviews = [];
    },
  },
});

export const { setCurrentReview } = reviewSlice.actions;
export default reviewSlice.reducer;

// unwrap property which can be called to extract the payload of a fulfilled action
