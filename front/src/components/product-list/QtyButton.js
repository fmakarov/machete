import { CheckIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts";
import { addToCart, removeFromCart } from "../../contexts/actions";

export default function QtyButton({ types, selectedVariant, name, isCart }) {
  const { cart, dispatchCart } = useContext(CartContext);
  const existingItem = cart.find((item) => {
    return item.type === types[selectedVariant];
  });
  const [qty, setQty] = useState(isCart ? existingItem.qty : 1);
  const [success, setSuccess] = useState(false);

  const handleChange = (direction) => {
    if (qty === 1 && direction === "down") {
      return null;
    }
    const newQty = direction === "up" ? qty + 1 : qty - 1;
    setQty(newQty);

    if (isCart) {
      if (direction === "up") {
        dispatchCart(addToCart(types[selectedVariant], 1, name));
      } else if (direction === "up") {
        dispatchCart(removeFromCart(types[selectedVariant], 1));
      }
    }
  };

  const handleCart = () => {
    setSuccess(true);
    dispatchCart(addToCart(types[selectedVariant], qty, name));
  };

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 1100);
    }
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <div className="flex space-x-3 items-center">
      {isCart ? null : (
        <button type="button" onClick={handleCart}>
          {success ? (
            <CheckIcon className="w-6 text-green-500 transition duration-500 ease-in-out transform" />
          ) : (
            <ShoppingBagIcon className="w-6 hover:text-orange" />
          )}
        </button>
      )}
      <button
        type="button"
        onClick={() => handleChange("down")}
        className="font-header font-bold text-xl border px-2 hover:bg-gray-200 text-gray-500"
      >
        -
      </button>
      <div className="font-header font-bold text-xl">{qty}</div>
      <button
        type="button"
        onClick={() => handleChange("up")}
        className="font-header font-bold text-xl border px-2 hover:bg-gray-200 text-gray-500"
      >
        +
      </button>
    </div>
  );
}
