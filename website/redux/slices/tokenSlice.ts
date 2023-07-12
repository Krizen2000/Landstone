import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TokenType = {
  token: string | null;
};

const initialState = {
  token: null,
} as TokenType;

export const tokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    resetToken: () => initialState,
    setToken: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload.token;
    },
  },
});

export const { resetToken, setToken } = tokenSlice.actions;
const tokenReducer = tokenSlice.reducer;
export default tokenReducer;
