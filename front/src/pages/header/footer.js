import React from "react";

export default function Footer() {
  let date = new Date()
  const year = date.getFullYear();
  return (
    <footer className="md:pt-16 pt-8 pb-6 bg-main px-4 md:px-0">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4">
          <div className="space-y-4 flex flex-col text-gray-400">
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
          <div className="block md:text-center">
            <span className="text-gray-400">
              Экспресс интернет-магазин Alif<span className="italic">Ko</span>
            </span>
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
        <div className="text-center pt-10 text-gray-500 text-xs border-t border-opacity-5">
          &copy; {year}, ИП Каюмова Гульшат Наиловна, ОГРНИП 321169000157255
        </div>
      </div>
    </footer>
  );
}