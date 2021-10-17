import React from "react";
import { CreditCardIcon, TrashIcon } from "@heroicons/react/outline";
import Slots from "./Slots";

export default function Payments({
  user,
  slot,
  setSlot,
  checkout,
  saveCard,
  setSaveCard,
}) {
  const card =
    user.username === "Guest"
      ? { last4: "", brand: "" }
      : user.paymentMethods[slot];

  return (
    <div className="flex-col space-y-5">
      <div className="py-4">
        <div>Внимание! Временно он-лайн оплата недоступна. Оплата картой или наличными после доставки</div>
      </div>
      <div className="flex items-center justify-between border py-2 px-3 bg-gray-50 hover:bg-gray-100">
        <CreditCardIcon className="w-8" />
        <div>
          {card.last4
            ? `${card[0].brand.toUpperCase()} **** **** **** ${card[0].last4}`
            : "Добавить новую карту"}
        </div>
        {card.last4 && (
          <button type="button">
            <TrashIcon className="w-6 text-gray-500 hover:text-orange" />
          </button>
        )}
      </div>
      <div className="flex md:space-x-5 justify-between">
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {checkout && (
          <div>
            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                checked={saveCard}
                onChange={() => setSaveCard(!saveCard)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <label for="toggle" className="text-xs text-gray-700">
              Сохранить карту, для будущих оплат
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
