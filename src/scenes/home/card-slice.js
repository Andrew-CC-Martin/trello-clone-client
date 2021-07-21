import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "cards",
  initialState: {
    value: [],
  },
  reducers: {
    set: (state, { payload }) => {
      console.log("cardSlice.set", payload);
      state.value = payload;
    },
    add: (state, { payload }) => {
      state.value.push(payload);
    },
    remove: (state, { payload }) => {
      state.value = state.value.filter((card) => card.id !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, set, remove } = cardSlice.actions;

export default cardSlice.reducer;
