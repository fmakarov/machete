import React from "react";
import { Link } from "gatsby";
import QtyButton from "./QtyButton";

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);

export default function ProductFrame({ good, type }) {
  return (
    <div className="flex-col md:shadow hover:shadow-md border bg-gray-50">
      <Link to={`/cat/${good.node.cat.slug}/${good.node.slug}`}>
        <div className="md:flex-col flex bg-white px-5 w-full">
          <div className=" self-center">
            <img src={`${type.images[0].url}`} className="w-40 md:w-48" />
          </div>
          <div className="h-16 text-sm py-4 overflow-hidden">{good.node.name}</div>
        </div>
      </Link>
      <div className="bg-gray-50">
        <div className="border-t flex justify-between items-center">
          <div className="font-header font-bold text-xl p-4">
            {toCurrency(type.price, "RUB", "Ru-ru")}
          </div>
          <div className="border-l p-4 flex">
            <QtyButton
              name={good.node.name}
              types={good.node.types}
              selectedVariant={good.node.types.indexOf(type)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
