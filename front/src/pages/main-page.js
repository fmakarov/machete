import React from "react";
import Slider from "./modules/swiper";
import Slides from "./modules/slider";

import img1 from "../images/pexels-tiger-lily-4481258.jpg";

const MainPage = () => {
  return (
    <div>
      <Slides />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold font-header">Распродажа</h1>
          <div className="flex flex-row py-10">
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
      <footer className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4 flex flex-col">
              <span>Принимаем к оплате</span>
              <div className="flex space-x-4 items-center">
                <span>
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/payment-methods-13/48/bitcoin_payments_pay_online_send_money_credit_card_ecommerce_2-1024.png"
                    className="w-20"
                  />
                </span>
                <span>
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/payment-methods-13/48/MasterCard_payments_pay_online_send_money_credit_card_ecommerce-1024.png"
                    className="h-20"
                  />
                </span>
                <span>
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/payment-methods-13/48/Visa_Electron_payments_pay_online_send_money_credit_card_ecommerce-512.png"
                    className="h-20"
                  />
                </span>
              </div>
            </div>
            <div className="block text-center">
              <span className="text-gray-500">Экспресс интернет-магазин Alifko</span>
            </div>
            <div className="block relative text-right">
              <span className="text-gray-500">Мы в соцсетях</span>
              <span className="absolute inset-y-10 right-0 flex space-x-6">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/viiva-social-media/32/instagram-512.png"
                  className="h-10"
                />
                <img
                  src="https://cdn4.iconfinder.com/data/icons/viiva-social-media/32/facebook-1024.png"
                  className="h-10"
                />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
