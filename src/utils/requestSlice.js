import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newRequests = state.filter((req) => req._id !== action.payload);
      return newRequests;
    },
    removeAllRequests: () => null,
  },
});

export const { addRequests, removeRequest, removeAllRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
