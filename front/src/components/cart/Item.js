import { TrashIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import { removeFromCart } from "../../contexts/actions";
import { toCurrency } from "../product-detail/ProductInfo";
import QtyButton from "../product-list/QtyButton";

export default function Item({ item }) {
  const { dispatchCart } = useContext(CartContext);
  const handleDelete = () => {
    dispatchCart(removeFromCart(item.type, item.qty));
  };
  const actions = [{ icon: <TrashIcon />, onClick: handleDelete }];
  return (
    <div className="flex flex-row md:space-x-5 items-center px-4 md:px-0 w-full justify-between">
      <div className="md:w-20 w-1/2 md:border pr-2">
        <img src={item.type.images[0].url} alt={item.type.id} />
      </div>
      <div className="flex md:flex-row flex-col md:space-x-5 space-y-3 md:space-y-0">
        <div className="flex-col space-y-2">
          <div className="text-xs text-gray-500 italic">
            Арт: {item.type.id}
          </div>
          <div className="md:text-base text-sm">{item.name}</div>
        </div>
        <div className="flex space-x-3 items-center">
          <QtyButton
            isCart
            name={item.name}
            selectedVariant={0}
            types={[item.type]}
          />
          <span>шт</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:pl-0 pl-2 text-center items-center">
        <div className="font-semibold font-header md:text-xl">
          {toCurrency(item.type.price)}
        </div>
        <div className="md:px-4 py-1">
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
    </div>
  );
}
