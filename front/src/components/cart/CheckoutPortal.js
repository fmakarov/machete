import React, { useEffect, useState } from "react";
import validate from "../../pages/ui/validate";
import Confirmation from "../settings/Confiramtion";
import Details from "../settings/Details";
import Location from "../settings/Location";
import Payments from "../settings/Payments";
import BillingConfirmation from "./BillingConfirmation";
import CheckoutNavigation from "./CheckoutNavigation";
import Shipping from "./Shipping";
import Thanks from "./Thanks";

export default function CheckoutPortal({ user }) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [detailValues, setDetailValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [detailSlot, setDetailSlot] = useState(0);
  const [detailForBilling, setDetailForBilling] = useState(false);

  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: "",
  });
  const [billingLocation, setBillingLocation] = useState({
    street: "",
    zip: "",
  });
  const [locationSlot, setLocationSlot] = useState(0);
  const [locationForBilling, setLocationForBilling] = useState(false);

  const [billingSlot, setBillingSlot] = useState(0);
  const [saveCard, setSaveCard] = useState(false);

  const [errors, setErrors] = useState({});

  const [order, setOrder] = useState(null)

  const [selectedShipping, setSelectedShipping] = useState(null);
  const shippingOptions = [
    { label: "Доставка по городу", price: 0 },
    { label: "Доставка за пределы", price: 500 },
  ];

  // const errorHelper = (values, forBilling, billingValues, slot) => {
  //   // const valid = validate(values);

  //   if (forBilling !== false && forBilling !== undefined) {
  //     const billingValid = validate(billingValues);

  //     if (forBilling === slot) {
  //       return Object.keys(billingValid).some((value) => !billingValid[value]);
  //     } else {
  //       return (
  //         Object.keys(billingValid).some((value) => !billingValid[value]) ||
  //         Object.keys(valid).some((value) => !valid[value])
  //       );
  //     }
  //   } else {
  //     return Object.keys(valid).some((value) => !valid[value]);
  //   }
  // };

  let steps = [
    {
      title: "Ваши данные",
      component: (
        <Details
          user={user}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          errors={errors}
          setErrors={setErrors}
          billing={detailForBilling}
          setBilling={setDetailForBilling}
          billingValues={billingDetails}
          setBillingValues={setBillingDetails}
          checkout
        />
      ),
      hasActions: true,
      // error: errorHelper(
      //   detailValues,
      //   detailForBilling,
      //   billingDetails,
      //   detailSlot
      // ),
    },
    {
      title: "Данные плательщика",
      component: (
        <Details
          values={billingDetails}
          setValues={setBillingDetails}
          errors={errors}
          setErrors={setErrors}
          selectedStep={selectedStep}
          checkout
          noSlots
        />
      ),
      // errors: errorHelper(billingDetails),
    },
    {
      title: "Адрес",
      component: (
        <Location
          user={user}
          values={locationValues}
          setValues={setLocationValues}
          slot={locationSlot}
          setSlot={setLocationSlot}
          billing={locationForBilling}
          setBilling={setLocationForBilling}
          errors={errors}
          setErrors={setErrors}
          billingValues={billingLocation}
          selectedStep={selectedStep}
          setBillingValues={setBillingLocation}
          checkout
        />
      ),
      hasActions: true,
      // error: errorHelper(
      //   locationValues,
      //   locationForBilling,
      //   billingLocation,
      //   locationSlot
      // ),
    },
    {
      title: "Адрес доставки",
      component: (
        <Location
          values={billingLocation}
          setValues={setBillingLocation}
          errors={errors}
          setErrors={setErrors}
          selectedStep={selectedStep}
          checkout
          noSlots
        />
      ),
      // error: errorHelper(billingLocation),
    },
    {
      title: "Доставка",
      component: (
        <Shipping
          selectedStep={selectedStep}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
        />
      ),
      // error: selectedShipping === null,
    },
    {
      title: "Оплата",
      component: (
        <Payments
          slot={billingSlot}
          setSlot={setBillingSlot}
          user={user}
          saveCard={saveCard}
          setSaveCard={setSaveCard}
          selectedStep={selectedStep}
          checkout
        />
      ),
      // error: false,
    },
    {
      title: "Подтверждение",
      component: (
        <Confirmation
          user={user}
          setOrder={setOrder}
          detailValues={detailValues}
          billingDetails={billingDetails}
          detailForBilling={detailForBilling}
          locationValues={locationValues}
          billingLocation={billingLocation}
          locationForBilling={locationForBilling}
          shippingOptions={shippingOptions}
          selectedShipping={selectedShipping}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
        />
      ),
    },
    {
      title: `Спасибо за заказ ${user.username}`,
      component: <Thanks selectedShipping={selectedShipping} order={order} />,
    },
  ];

  if (detailForBilling !== false) {
    steps = steps.filter((step) => step.title !== "Данные плательщика");
  }

  if (locationForBilling !== false) {
    steps = steps.filter((step) => step.title !== "Адрес доставки");
  }

  useEffect(() => {
    setErrors({});
  }, [detailSlot, locationSlot, selectedStep]);

  return (
    <div className="flex-col bg-gray-100 p-5 w-5/12">
      <CheckoutNavigation
        steps={steps}
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
        details={detailValues}
        detailSlot={detailSlot}
        setDetails={setDetailValues}
        location={locationValues}
        setLocation={setLocationValues}
        locationSlot={locationSlot}
        setErrors={setErrors}
      />
      <div>{steps[selectedStep].component}</div>
      {steps[selectedStep].title === "Подтверждение" && (
        <BillingConfirmation
          detailForBilling={detailForBilling}
          billingDetails={billingDetails}
          detailSlot={detailSlot}
          locationForBilling={locationForBilling}
          billingLocation={billingLocation}
          locationSlot={locationSlot}
        />
      )}
    </div>
  );
}
