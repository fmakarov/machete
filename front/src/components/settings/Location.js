import React, { useEffect, useRef } from "react";
import Fields from "../auth/Fields";
import Slots from "./Slots";

export default function Location({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
  checkout,
  billing,
  setBilling,
  billingValues,
  setBillingValues,
  noSlots,
}) {
  const isMounted = useRef(false);
  const fields = {
    street: {
      placeholder: "Улица",
      helperText: "invalid address",
    },
    zip: {
      placeholder: "Индекс",
      helperText: "invalid Индекс",
    },
  };

  useEffect(() => {
    if (noSlots || user.username === "Guest") return;
    setValues(user.locations[slot]);
  }, [slot]);

  useEffect(() => {
    if (!checkout) {
      const changed = Object.keys(user.locations[slot]).some(
        (field) => values[field] !== user.locations[slot][field]
      );
      setChangesMade(changed);
    }
  }, [values]);

  useEffect(() => {
    if (noSlots) {
      isMounted.current = false;
      return;
    }
    if (isMounted.current === false) {
      isMounted.current = true;
      return;
    }
    if (billing === false && isMounted.current) {
      setValues(billingValues);
    } else {
      setBillingValues(values);
    }
  }, [billing]);

  return (
    <div className="flex-col space-y-5 md:pr-5 py-5">
      <div className="flex md:flex-row flex-col md:space-x-5">
        <Fields
          fields={fields}
          values={billing === slot && !noSlots ? billingValues : values}
          setValues={
            billing === slot && !noSlots ? setBillingValues : setValues
          }
          errors={errors}
          setErrors={setErrors}
          disabled={checkout ? false : !edit}
        />
      </div>
      <div>{values.city ? `${values.city}` : "Город: Казань"}</div>
      {noSlots ? null : (
        <div className="flex md:flex-row md:space-x-5 flex-col space-y-4 md:space-y-4 md:justify-between items-center">
          <Slots slot={slot} setSlot={setSlot} checkout={checkout} />
          {checkout && (
            <div className="flex justify-between items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  checked={billing === slot}
                  onChange={() => setBilling(billing === slot ? false : slot)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                />
              </div>
              <label htmlFor="toggle" className="text-xs text-gray-700">
                Адрес доставки совпадает с вашим адресом
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
