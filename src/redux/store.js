import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";

import cardReducer from "../scenes/home/card-slice.js";

export const store = configureStore({
  reducer: {
    cards: undoable(cardReducer, {
      limit: 100,
    }),
  },
});
