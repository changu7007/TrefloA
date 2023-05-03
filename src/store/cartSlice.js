import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (pizzaItem) => pizzaItem.id === action.payload.id
      );
      if (item) {
        item.quantity++;
        item.onePizzaPrice = item.price * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (pizzaItem) => pizzaItem.id !== action.payload.id
      );
      state.cartItems = removeItem;
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (piizaItem) => piizaItem.id === action.payload.id
      );
      if (item) {
        item.quantity++;
        item.onePizzaPrice = item.price * item.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (piizaItem) => piizaItem.id === action.payload.id
      );
      if (item.quantity === 1) {
        const removeItem = state.cartItems.filter(
          (pizzaItem) => pizzaItem.id !== action.payload.id
        );
        state.cartItems = removeItem;
      } else {
        item.quantity--;
        item.onePizzaPrice = item.price * item.quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
