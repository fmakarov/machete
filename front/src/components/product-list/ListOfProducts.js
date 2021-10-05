import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductFrame from "./ProductFrameGrid";

import { GET_DETAILS } from "../../apollo/queries";

export default function ListOfProducts({
  products,
  page,
  productsPerPage,
  content,
}) {
  const FrameHelper = ({ Frame, product, variant }) => {
    const [stock, setStock] = useState(null);

    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: product.node.strapiId },
    });

    useEffect(() => {
      if (error) {
        setStock(-1);
      } else if (data) {
        setStock(data.product.variants);
      }
    }, [error, data]);

    return <Frame variant={variant} product={product} stock={stock} />;
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {content
          .slice((page - 1) * productsPerPage, page * productsPerPage)
          .map((item) => {
            return (
              <FrameHelper
                Frame={ProductFrame}
                key={item.variant.id}
                variant={item.variant}
                product={products[item.product]}
              />
            );
          })}
      </div>
    </div>
  );
}
