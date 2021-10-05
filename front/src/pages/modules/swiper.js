import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import QtyButton from "../../components/product-list/QtyButton"
import { ShoppingBagIcon } from "@heroicons/react/outline";
import "swiper/css";

const slide = [
  {
    name: "Смеситель для кухни ROSSINKA Z Z35-35U-Black c гибким изливом черный/хром",
    img: "//cs.petrovich.ru/image/6995407/original-925x925-fit.jpg",
    price: "2399",
  },
  {
    name: "Обогреватель масляный КМ 1500 Вт 7 секций с сушилкой",
    img: "https://cs.petrovich.ru/image/7327402/original-925x925-fit.jpg",
    price: "1999",
  },
  {
    name: "Гидроизоляция Plitonit ГидроЭласт 14 кг",
    img: "https://cs.petrovich.ru/images/2995132/original-925x925-fit.jpg",
    price: "3999",
  },
  {
    name: "Инсталляция GROHE Solido 38971000 без клавиши без унитаза",
    img: "https://cs.petrovich.ru/image/7576797/original-925x925-fit.jpg",
    price: "9850",
  },
  {
    name: "Обои компакт-винил на флизелиновой основе Elysium Лира фон Е42102 (1,06х10 м)л",
    img: "https://cs.petrovich.ru/image/6348875/original-925x925-fit.jpg",
    price: "1777",
  },
];

const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
    minimumFractionDigits: 0,
  }).format(n);

const Slider = () => {
  return (
    <Swiper spaceBetween={30} slidesPerView={5}>
      {slide.map(({ name, img, price }) => {
        return (
          <SwiperSlide key={name} className="bg-white border rounded shadow-md">
            <div className="flex flex-col p-5">
              <div>
                <img src={img} className="w-full" />
              </div>
              <div className="text-center">
                <h2 className="text-sm">{name}</h2>
              </div>
            </div>
            <div className="border-t flex justify-between">
              <div className="font-header font-bold text-2xl p-5">
                {toCurrency(price, "RUB", "Ru-ru")}
              </div>
              <div className="flex space-x-3 pr-3">
                <QtyButton />
                <ShoppingBagIcon className="w-7 text-orange hover:text-gray-900" />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
