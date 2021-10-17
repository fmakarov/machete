import React, { useEffect, useRef } from "react";
import Fields from "../auth/Fields";
import { EmailPassword } from "../auth/Login";
import Slots from "./Slots";

export default function Details({
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

  useEffect(() => {
    if (noSlots || user.username === "Guest") {
      isMounted.current = false;
      return;
    }
    if (checkout) {
      setValues(user.contactInfo[slot]);
    } else {
      setValues({ ...user.contactInfo[slot], password: "********" });
    }
  }, [slot]);

  useEffect(() => {
    if (checkout) return;

    const changed = Object.keys(user.contactInfo[slot]).some(
      (field) => values[field] !== user.contactInfo[slot][field]
    );
    setChangesMade(changed);
  }, [values]);

  useEffect(() => {
    if (noSlots) return;
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

  const email_password = EmailPassword(false, false);
  const name_phone = {
    name: {
      helperText: "Введите имя и фамилию",
      placeholder: "ФИО",
    },
    phone: {
      helperText: "Неверный формат! Формат: 8950-123-12-18",
      placeholder: "Контактный номер",
    },
  };

  let fields = [name_phone, email_password];

  if (checkout) {
    fields = [
      { name: name_phone.name },
      { email: email_password.email },
      { phone: name_phone.phone },
    ];
  }

  return (
    <div className="flex-col">
      <div className="py-5 md:pr-5">
        {fields.map((pair, i) => {
          return (
            <div key={i}>
              <Fields
                fields={pair}
                values={billing === slot && !noSlots ? billingValues : values}
                setValues={
                  billing === slot && !noSlots ? setBillingValues : setValues
                }
                errors={errors}
                setErrors={setErrors}
                disabled={checkout ? false : !edit}
                settings={!checkout}
              />
            </div>
          );
        })}
      </div>
      {noSlots ? null : (
        <div className="flex space-x-5 justify-between items-center">
          <Slots slot={slot} setSlot={setSlot} checkout={checkout} />
          {checkout && (
            <div className="md:flex md:space-x-2 items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  id="toggle"
                  type="checkbox"
                  name="toggle"
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
                Перейти к оплате
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
