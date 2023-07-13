import { createSlice } from "@reduxjs/toolkit";

type NewsEmailType = {
  isSubscribed: boolean;
};

const initialState = {
  isSubscribed: false,
} as NewsEmailType;

export const newsEmailSlice = createSlice({
  name: "NewsEmailType",
  initialState,
  reducers: {
    setIsSubscribed: (state) => {
      state.isSubscribed = true;
    },
  },
});

export const { setIsSubscribed } = newsEmailSlice.actions;
const newsEmailReducer = newsEmailSlice.reducer;
export default newsEmailReducer;
