import { createSlice } from "@reduxjs/toolkit";

export const seatSlice = createSlice({
  name: "seats",
  initialState: {
    value: [],
  },
  reducers: {},
});

const { reducer } = seatSlice;
export default reducer;
