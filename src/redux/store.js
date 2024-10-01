export const { setCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./slices/CartSlice";
import  { categorySlice } from "./slices/CategorySlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    category: categorySlice.reducer,
  },
});
