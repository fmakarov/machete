import React from "react";

export default function BillingConfirmation({
  detailForBilling,
  billingDetails: { name, email, phone },
  detailSlot,
  locationForBilling,
  billingLocation: { street, zip },
  locationSlot,
}) {
  const fields = [
    {
      title: "Данные плательщика",
      values: { name, email, phone },
      hidden: detailForBilling === detailSlot,
    },
    {
      title: "Адрес доставки",
      values: {
        address1: street,
        address2: zip,
      },
      hidden: locationForBilling === locationSlot,
    },
  ];
  return (
    <div className="flex-col flex">
      {fields.map((field) =>
        field.hidden ? null : (
          <div key={field.title}>
            <div className="text-lg font-semibold font-header">{field.title}</div>
            <div className="text-gray-500">
              {Object.keys(field.values).map((value) => (
                <span key={value}>
                  {field.values[value]}
                  <br />
                </span>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
