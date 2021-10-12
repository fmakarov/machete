import { TrashIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import { removeFromCart } from "../../contexts/actions";
import { toCurrency } from "../product-detail/ProductInfo";
import QtyButton from "../product-list/QtyButton";

export default function Item({ item }) {
  const { dispatchCart } = useContext(CartContext)
  const handleDelete = () => {
    dispatchCart(removeFromCart(item.type, item.qty))
  }
  const actions = [{ icon: <TrashIcon />, onClick: handleDelete }];
  return (
    <div className="flex space-x-5">
      <div className="w-20 border">
        <img
          src={process.env.GATSBY_STRAPI_URL + item.type.images[0].url}
          alt={item.type.id}
        />
      </div>
      <div className="w-2/5">
        <div className="flex-col">
          <div>{item.name}</div>
          <div className="text-xs text-gray-500 italic">ID: {item.type.id}</div>
        </div>
        <div>
          <QtyButton
            isCart
            name={item.name}
            selectedVariant={0}
            types={[item.type]}
          />
        </div>
      </div>
      <div className="font-semibold font-header text-xl">
        {toCurrency(item.type.price)}
      </div>
      <div className="px-4 py-1">
        {actions.map((action, i) => {
          return (
            <button
              type="button"
              key={i}
              onClick={() => action.onClick()}
              className="w-6 text-gray-400 hover:text-red-600"
            >
              {action.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
