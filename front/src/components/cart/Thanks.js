import { BadgeCheckIcon } from "@heroicons/react/outline";
import React from "react";

export default function Thanks({ selectedShipping, order }) {
  const addToDate = (days) => {
    var date = new Date();
    date.setDate(date.getDate() + days);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const getExpected = () => {
    switch (selectedShipping) {
      case "Доставка по городу":
        return addToDate(1);
      case "Доставка за пределы":
        return addToDate(1);
      default:
        return addToDate(3);
    }
  };

  return (
    <div className="flex py-4 flex-col space-y-3">
      <BadgeCheckIcon className="w-14 text-green-400 self-center" />
      <div>
        <span className="text-gray-500">Ожидаемая дата доставки: </span>{" "}
        {getExpected()}
      </div>
      <div>
        <span className="text-gray-500">Номер вашего заказ: </span>
        {order.id.slice(order.id.length - 10, order.id.length)}
      </div>
    </div>
  );
}
