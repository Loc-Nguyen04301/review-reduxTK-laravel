import { configureStore } from "@reduxjs/toolkit";
import reviewReducer from "./slices/review";
import authReducer from "./slices/auth";

// create Store
const store = configureStore({
  // add reducer to the Store
  reducer: {
    review: reviewReducer,
    auth: authReducer,
  },
  devTools: true,
});

export default store;
