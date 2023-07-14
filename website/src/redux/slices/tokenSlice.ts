import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = null as string | null;

export const tokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    resetToken: () => initialState,
    setToken: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { resetToken, setToken } = tokenSlice.actions;
const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
