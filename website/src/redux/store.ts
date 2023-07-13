import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import tokenReducer from "./slices/tokenSlice";
import personalInfoReducer from "./slices/personalInfoSlice";
import { persistReducer, persistStore } from "redux-persist";
import newsEmailReducer from "./slices/newsEmail";

const rootReducer = combineReducers({
  token: tokenReducer,
  personalInfo: personalInfoReducer,
  newsEmail: newsEmailReducer,
});
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
