import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./action-types";

export const addToCart = (type, qty, name, stock) => ({
  type: ADD_TO_CART,
  payload: { type, qty, name, stock },
});

export const removeFromCart = (type, qty) => ({
  type: REMOVE_FROM_CART,
  payload: { type, qty },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});