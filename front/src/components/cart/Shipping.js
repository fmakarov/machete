import React from "react";
import { toCurrency } from "../product-detail/ProductInfo";

export default function Shipping({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) {
  return (
    <div className="flex-col py-4">
      <div className="flex flex-col space-y-2 py-4">
        <div className="text-gray-400 text-sm">
          Внимание! Мы работаем над автоматическим расчетом доставки. Наш
          менеджер с вами свяжется для расчета полной стоимости!
        </div>
        {shippingOptions.map((option) => {
          return (
            <div key={option.label}>
              <button
                onClick={() => setSelectedShipping(option.label)}
                className={
                  selectedShipping === option.label
                    ? "bg-white flex space-x-3 font-semibold font-header uppercase py-1 px-2 "
                    : `lex space-x-3 font-semibold font-header uppercase py-1 px-2 `
                }
              >
                <span>{option.label}</span>
                <span className="text-gray-500">
                  {toCurrency(option.price)}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
