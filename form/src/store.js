import { configureStore } from '@reduxjs/toolkit';
import { reviewReducer } from './slices/review';
import {logger}  from 'redux-logger'
// create Store
const store = configureStore({
  // add reducer to the Store
  reducer: {
    review: reviewReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
