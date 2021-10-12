import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useQuery } from "@apollo/client";
import Layout from "../pages/layout";
import ProductImages from "../components/product-detail/ProductImages";
import ProductInfo from "../components/product-detail/ProductInfo";

import { GET_DETAILS } from "../apollo/queries";

export default function ProductDetail({
  pageContext: { name, cat, types, art, price, id },
}) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [stock, setStock] = useState(null);

  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { id }
  });

  useEffect(() => {
    if (error) {
      setStock(-1);
    } else if (data) {
      setStock(data.good.types);
    }
  }, [error, data]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16">
        <div className="flex-col">
          <div className="text-gray-500 text-sm pb-10">
            Каталог /{" "}
            <Link to={`/cat/${cat.slug}`} className="text-gray-700 underline">
              {cat.title}
            </Link>
            /{" "}{name}
          </div>
          <div className="flex space-x-5 mx-auto">
            <div className="w-1/3 flex-col">
              <ProductImages
                images={types[selectedVariant].images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
            <div className="w-2/3">
              <ProductInfo
                name={name}
                art={art}
                types={types}
                stock={stock}
                good={id}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            </div>
          </div>
          <div className="flex-col py-5">
            <div className="text-3xl font-header font-semibold">
              Характеристики
            </div>
            <div className="py-5 text-gray-600">desc</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
