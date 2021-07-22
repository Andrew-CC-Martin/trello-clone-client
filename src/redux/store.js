import { configureStore } from "@reduxjs/toolkit";

import cardReducer from "../scenes/home/reducers.js";

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});
