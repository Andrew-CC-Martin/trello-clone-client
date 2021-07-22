import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "cards",
  initialState: {
    value: [],
  },
  reducers: {
    addCard: (state, { payload }) => {
      state.value.push(payload);
    },
    removeCard: (state, { payload }) => {
      state.value = state.value.filter((card) => card.id !== payload);
    },
    setCards: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { addCard, removeCard, setCards } = cardSlice.actions;

export default cardSlice.reducer;
