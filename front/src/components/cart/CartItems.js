import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import Item from "./Item";

export default function CartItems() {
  const { cart } = useContext(CartContext);
  return (
    <div className="flex-col space-y-6">
      {cart.map((item) => {
        return <Item item={item} key={item.type.id} />;
      })}
    </div>
  );
}
