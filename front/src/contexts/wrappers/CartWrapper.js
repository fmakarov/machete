import React, { createContext, useReducer } from "react";
import cartReducer from "../reducers/cart-reducer";

export const CartContext = createContext();

const CartProvider = CartContext.Provider;

export function CartWrapper({ children }) {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, dispatchCart] = useReducer(cartReducer, storedCart || []);

  return <CartProvider value={{ cart, dispatchCart }}>{children}</CartProvider>;
}
