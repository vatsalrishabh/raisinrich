import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    quantityIncrease: (state, action) => {
      state.products.map((item) => {
        if (item.title === action.payload.title) {
          state.quantity += 1;
          item.foodQuantity += 1;
          state.total += action.payload.price;
        }
      });
    },
    quantityDecrease: (state, action) => {
      state.products.map((item) => {
        if (item.title === action.payload.title) {
          if (item.foodQuantity > 1) {
            state.quantity -= 1;
            item.foodQuantity -= 1;
            state.total -= action.payload.price;
          } else {
            state.products = state.products.filter(
              (prod) => prod.title !== action.payload.title
            );
            state.quantity -= 1;
            state.total -= action.payload.price;
          }
        }
      });
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find(
        (item) => item.title === action.payload.title
      );

      if (productToRemove) {
        state.products = state.products.filter(
          (item) => item.title !== action.payload.title
        );
        state.quantity -= productToRemove.foodQuantity;
        state.total -= productToRemove.price * productToRemove.foodQuantity;
      }
    },
  },
});

export const {
  addProduct,
  reset,
  quantityDecrease,
  quantityIncrease,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
