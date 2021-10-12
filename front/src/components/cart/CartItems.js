import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import Item from "./Item";

export default function CartItems() {
  const { cart } = useContext(CartContext);
  return (
    <div>
      {cart.map((item) => {
        return <Item item={item} key={item.type.id} />;
      })}
    </div>
  );
}
