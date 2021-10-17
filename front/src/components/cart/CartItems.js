import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { Link } from "gatsby";
import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import Item from "./Item";

export default function CartItems() {
  const { cart } = useContext(CartContext);
  return (
    <div className="flex-col space-y-6 w-2/3">
      {cart.length > 0 ? (
        cart.map((item) => {
          return <Item item={item} key={item.type.id} />;
        })
      ) : (
        <div className="flex text-gray-500 items-center">
          <span>Ваша корзина пуста.</span>
          <Link to="/">Вперед за покупками</Link>
          <ChevronDoubleRightIcon className="ml-1 w-4" />
        </div>
      )}
    </div>
  );
}
