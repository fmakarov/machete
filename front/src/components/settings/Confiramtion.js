import {
  BriefcaseIcon,
  CheckIcon,
  CreditCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext } from "react";
import { CartContext } from "../../contexts";
import { clearCart } from "../../contexts/actions";
import { toCurrency } from "../product-detail/ProductInfo";

export default function Confirmation({
  user,
  detailValues,
  billingDetails,
  detailForBilling,
  locationValues,
  billingLocation,
  locationForBilling,
  shippingOptions,
  selectedShipping,
  selectedStep,
  setSelectedStep,
  setOrder
}) {
  const { cart, dispatchCart } = useContext(CartContext);
  const shipping = shippingOptions.find(
    (option) => option.label === selectedShipping
  );

  const subtotal = cart.reduce((total, item) => {
    return total + item.type.price * item.qty;
  }, 0);

  const firstFields = [
    { value: detailValues.name, adornment: <UserIcon className="w-6" /> },
    { value: detailValues.email, adornment: <MailIcon className="w-6" /> },
    { value: detailValues.phone, adornment: <PhoneIcon className="w-6" /> },
  ];

  const secondFields = [
    {
      value: `${locationValues.street}, ${locationValues.zip}`,
      adornment: <BriefcaseIcon className="w-6" />,
    },
    {
      value: "**** **** **** 1234",
      adornment: <CreditCardIcon className="w-6" />,
    },
  ];

  const prices = [
    {
      label: "Итого",
      value: subtotal.toFixed(2),
    },
    {
      label: "Доставка",
      value: shipping.price.toFixed(2),
    },
  ];

  const total = prices.reduce((total, item) => {
    return total + parseFloat(item.value);
  }, 0);

  const adornmentValue = (adornment, value) => {
    return (
      <>
        <div>{adornment}</div>
        <div>{value}</div>
      </>
    );
  };

  const handleOrder = () => {
    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/orders/place",
        {
          shippingAddress: locationValues,
          billingAddress: billingLocation,
          shippingInfo: detailValues,
          billingInfo: billingDetails,
          shippingOption: shipping,
          subtotal: subtotal.toFixed(2),
          total: total.toFixed(2),
          items: cart,
        },
        {
          headers:
            user.username === "Guest"
              ? undefined
              : { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then((res) => {
        dispatchCart(clearCart());
        setOrder(res.data.order)
        setSelectedStep(selectedStep + 1);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div>
          {firstFields.map((field) => {
            return (
              <div key={field.value} className="flex space-x-3">
                {adornmentValue(field.adornment, field.value)}
              </div>
            );
          })}
        </div>
        <CheckIcon className="w-6" />
      </div>
      <div>
        {secondFields.map((field, i) => {
          return (
            <div key={i}>
              <div className="flex space-x-3">
                {adornmentValue(field.adornment, field.value)}
              </div>
              <div className="flex space-x-3">
                <div>{prices[i].label}</div>
                <div>{prices[i].value}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex pt-4">
        <button
          type="button"
          onClick={handleOrder}
          className="px-3 py-1 bg-white flex space-x-5 hover:bg-green-500 hover:text-white font-semibold font-header"
        >
          <div>Оплатить</div>
          <div>{toCurrency(total)}</div>
        </button>
      </div>
    </div>
  );
}
