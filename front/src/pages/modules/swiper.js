import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Swiper, SwiperSlide } from "swiper/react";
import QtyButton from "../../components/product-list/QtyButton";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import "swiper/css";

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);

export default function Slider() {
  const data = useStaticQuery(graphql`
    query SwiperQuery {
      allStrapiGood {
        edges {
          node {
            art
            cat {
              slug
              title
            }
            features
            name
            types {
              color
              id
              material
              price
              qty
              size
              images {
                url
              }
            }
          }
        }
      }
    }
  `);
  const goods = data.allStrapiGood.edges;
  const featured = Object.keys(goods)
    .filter((option) => goods[option].node.features !== false)
    .map((it) => goods[it].node);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
      breakpoints={{
        320: {
          slidesPerView: 1
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 2,
        },
      }}
    >
      {featured.map(({ name, types, art }) => {
        return (
          <SwiperSlide key={name}>
            {types.map((element) => {
              return (
                <div key={element.id} className="flex flex-col p-4">
                  <div className="flex self-center">
                    <img src={element.images[0].url} className="md:h-32 w-full" />
                  </div>
                  <div className="py-2 text-sm">
                    <span className="text-gray-400 text-xs">Арт. {art}</span>
                    <h2>{name}</h2>
                  </div>
                  <div className="border-t flex justify-between">
                    <div className="font-header font-bold text-2xl py-2">
                      {toCurrency(element.price, "RUB", "Ru-ru")}
                    </div>
                    <div className="flex space-x-3 pr-3">
                      <QtyButton
                        name={name}
                        types={types}
                        selectedVariant={types.indexOf(types[0])}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
