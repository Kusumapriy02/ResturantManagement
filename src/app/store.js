import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteslice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
});