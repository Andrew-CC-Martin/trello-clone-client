import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "../scenes/home/card-slice.js";

export const store = configureStore({
  reducer: {
    cardReducer,
  },
});
