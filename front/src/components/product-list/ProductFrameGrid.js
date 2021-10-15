import React from "react";
import { Link } from "gatsby";
import QtyButton from "./QtyButton";

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);

const imgUrl = process.env.GATSBY_STRAPI_URL;

export default function ProductFrame({ good, type }) {
  return (
    <div className="flex-col md:shadow hover:shadow-md border bg-gray-50">
      <Link to={`/cat/${good.node.cat.slug}/${good.node.slug}`}>
        <div className="bg-white px-5 items-center">
          <div className="md:flex-col flex self-center justify-center">
            <img src={`${imgUrl}${type.images[0].url}`} className="w-40 md:w-auto" />
          </div>
          <div className="h-16 text-sm md:text-base">{good.node.name}</div>
        </div>
      </Link>
      <div className="bg-gray-50">
        <div className="border-t flex justify-between items-center">
          <div className="font-header font-bold text-xl p-4">
            {toCurrency(type.price, "RUB", "Ru-ru")}
          </div>
          <div className="border-l p-5 flex space-x-5">
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
