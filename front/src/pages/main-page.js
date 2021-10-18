import React from "react";
import Slider from "./modules/swiper";
import Slides from "./modules/slider";

import img1 from "../images/pexels-tiger-lily-4481258.jpg";

const MainPage = () => {
  return (
    <div>
      <Slides />
      <section className="md:py-16 py-5 px-5 md:px-0">
        <div className="container mx-auto">
          <h1 className="md:text-4xl text-2xl font-bold font-header pb-4">Рекомендуем</h1>
          <div className="flex flex-row">
            <Slider />
          </div>
        </div>
      </section>
      <section className="py-16 bg-orange bg-opacity-80">
        <div className="container mx-auto">
          <div className="flex space-x-5">
            <div className="w-1/3">
              <img src={img1} className="w-96" />
            </div>
            <div className="flex text-white flex-col space-y-10">
              <span className="block text-5xl max-w-lg font-bold font-header">
                Доставка до дома или до квартиры &ndash; за наш счет
              </span>
              <span className="text-gray-700 max-w-3xl">
                Быстрая доставка строительных товаров по низким ценам сделает
                ваши покупки более приятными. Ремонт может стоить дешево, если
                делать его с нами. Для вас всегда в наличии более 30 000 товаров
                для строительства по низким ценам каждый день. Выгодные цены -
                широкий ассортимент товаров для дома и ремонта.
              </span>
              <div className="py-8">
                <button
                  type="button"
                  className="p-3 font-bold font-header bg-white hover:bg-gray-100 text-gray-600 rounded-sm"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold font-header">Распродажа</h1>
          <div className="flex flex-row py-10">
            <Slider />
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold font-header">Рекомендуем</h1>
          <div className="flex flex-row py-10">
            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
