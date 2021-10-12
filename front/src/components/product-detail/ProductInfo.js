import React from "react";
import QtyButton from "../product-list/QtyButton";

export const toCurrency = (n) => {
  const curr = "RUB";
  const LanguageFormat = "Ru-ru";
  return Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);
};
export const getStockDisplay = (stock, type) => {
  switch (stock) {
    case undefined:
      break;
    case null:
      return (
        <div className="pt-10 text-sm text-gray-500">Загрузка данных...</div>
      );
    case -1:
      return "Ошибка загрузки данных";
    default:
      if (stock[type].qty === 0) {
        return (
          <div className="pt-10 text-sm text-yellow-600">Нет в наличии</div>
        );
      } else {
        return <div className="pt-10 text-sm text-green-500">В наличии</div>;
      }
  }
};

export default function ProductInfo({
  name,
  types,
  art,
  stock,
  selectedVariant,
}) {
  const stockDisplay = getStockDisplay(stock, selectedVariant);
  return (
    <div className="px-10">
      <div className="flex-col space-y-5">
        <div className="flex text-gray-400 text-sm">Артикул {art}</div>
        <div className="py-5 font-semibold font-header text-xl">{name}</div>
        <div className="text-gray-600">
          Производитель: {types[selectedVariant].steel}
        </div>
        <div>{stockDisplay}</div>
        <div className="text-black pb-10 font-semibold font-header text-xl border-b">
          {toCurrency(types[selectedVariant].price)}
        </div>
        <div className="flex justify-around">
          <QtyButton
            selectedVariant={selectedVariant}
            types={types}
            name={name}
          />
        </div>
        <div className="flex-col text-gray-500 py-5 space-y-5">
          <div className="flex space-x-5 items-center">
            <div className="w-14">
              <img src="https://cdn4.iconfinder.com/data/icons/logistics-and-shipping-5/85/fast_delivery_truck_logistics_shipping-512.png" />
            </div>
            <div className="flex-col">
              <div>Пункты выдачи заказа</div>
              <div>
                Завтра -{" "}
                <span className="text-green-500 font-semibold font-header">
                  бесплатно
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-14">
              <img src="https://cdn1.iconfinder.com/data/icons/aami-web-internet/64/aami2-05-512.png" />
            </div>
            <div className="flex-col">
              <div>Экспресс-доставка из магазина</div>
              <div>
                Сегодня -{" "}
                <span className="text-green-500 font-semibold font-header">
                  бесплатно
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
