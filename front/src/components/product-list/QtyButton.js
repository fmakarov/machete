import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts";
import { addToCart } from "../../contexts/actions";

export default function QtyButton({ variants, selectedVariant, name }) {
  const [qty, setQty] = useState(1);
  const { cart, dispatchCart } = useContext(CartContext);

  const handleChange = (direction) => {
    if (qty === 1 && direction === "down") {
      return null;
    }

    const newQty = direction === "up" ? qty + 1 : qty - 1;
    setQty(newQty);
  };

  const handleCart = () => {
    dispatchCart(addToCart(variants[selectedVariant], qty, name));
  };

  return (
    <div className="flex space-x-3 items-center">
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
