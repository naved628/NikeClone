// @ts-nocheck
import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        (item) => item?.product.id === newProduct.id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({
          product: newProduct,
          quantity: 1,
        });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        cartItem.quantity += amount;
      }
      if (cartItem.quantity <= 0) {
        state.items = state.items.filter((item) => item !== cartItem);
      }
    },
  },
});

export const selectedSubTotal = (state) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );
const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectedSubTotal,
  (cart, subTotal) => (subTotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotalAmount = createSelector(
    selectedSubTotal,
    selectDeliveryPrice,
    (subtotal, delivery)=> subtotal+ delivery
);