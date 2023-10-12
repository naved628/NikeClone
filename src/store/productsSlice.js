import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState = {
  products: products,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      const productId = action.payload;
      // @ts-ignore
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
});