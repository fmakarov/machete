import React from "react";
import { Link } from "gatsby";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import QtyButton from "./QtyButton";

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);

const imgUrl = process.env.GATSBY_STRAPI_URL;

export default function ProductFrame({ product, variant }) {
  return (
    <div className="flex-col shadow hover:shadow-md border bg-gray-50">
      <Link to={`/cat/${product.node.category.slug}/${product.node.slug}`}>
        <div className="bg-white px-5">
          <div className="flex-col">
            <img src={`${imgUrl}${product.node.image.url}`} />
          </div>
          <div className="h-16">{product.node.title}</div>
        </div>
      </Link>
      <div className="bg-gray-50">
        <div className="border-t flex justify-between items-center">
          <div className="font-header font-bold text-xl p-4">
            {toCurrency(product.node.price, "RUB", "Ru-ru")}
          </div>
          <div className="border-l p-5 flex space-x-5">
            <ShoppingBagIcon className="w-6 hover:text-orange" />
            <QtyButton
              name={product.node.title}
              variants={product.node.variants}
              selectedVariant={product.node.variant.indexOf(variant)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
