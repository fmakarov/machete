import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductFrame from "./ProductFrameGrid";

import { GET_DETAILS } from "../../apollo/queries";

export default function ListOfProducts({
  goods,
  page,
  productsPerPage,
  content,
}) {
  const FrameHelper = ({ Frame, good, type }) => {
    const [stock, setStock] = useState(null);

    const { loading, error, data } = useQuery(GET_DETAILS, {
      variables: { id: good.node.strapiId },
    });

    useEffect(() => {
      if (error) {
        setStock(-1);
      } else if (data) {
        setStock(data.good.types);
      }
    }, [error, data]);

    return <Frame type={type} good={good} stock={stock} />;
  };

  return (
    <>
      <div className="grid md:grid-cols-4 md:gap-5 px-4 md:px-0">
        {content
          .slice((page - 1) * productsPerPage, page * productsPerPage)
          .map((item) => {
            return (
              <FrameHelper
                Frame={ProductFrame}
                key={item.type.id}
                type={item.type}
                good={goods[item.good]}
              />
            );
          })}
      </div>
    </>
  );
}
