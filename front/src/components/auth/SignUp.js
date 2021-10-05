import React, { useState } from "react";
import axios from "axios";
import {
  UserAddIcon,
  UserCircleIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

import Fields from "./Fields";
import { EmailPassword } from "./Login";
import { setUser } from "../../contexts/actions";

export default function SignUp({ steps, setSelectedStep, dispatchUser }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState(false);

  const handleNavigation = (direction) => {
    if (direction === "forward") {
      setInfo(true);
    } else {
      if (info) {
        setInfo(false);
      } else {
        const login = steps.find((step) => step.label === "Login");
        setSelectedStep(steps.indexOf(login));
      }
    }
  };

  const handleComplete = () => {
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        dispatchUser(
          setUser({ ...response.data.user, jwt: response.data.jwt })
        );

        const complete = steps.find((step) => step.label === "Complete");
        setSelectedStep(steps.indexOf(complete));
      })
      .catch((error) => console.log(error));
  };

  const nameField = {
    name: {
      helperText: "Введите ФИО",
      placeholder: "ФИО",
    },
  };

  const fields = info ? EmailPassword(false, false) : nameField;

  const disabled =
    Object.keys(errors).some((error) => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length;

  return (
    <div className="flex-col space-y-5 p-5">
      <div className="flex py-8 justify-center">
        <UserAddIcon className="w-20" />
      </div>
      <div className="flex-col">
        <Fields
          fields={fields}
          errors={errors}
          setErrors={setErrors}
          values={values}
          setValues={setValues}
        />
      </div>
      <div className="py-5">
        {info ? (
          <button
            type="button"
            disabled={info && disabled}
            onClick={() => (info ? handleComplete() : "")}
            className={`${
              disabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 bg-opacity-90 hover:bg-opacity-100"
            } text-white px-5 py-2 rounded`}
          >
            Зарегистрироваться
          </button>
        ) : null}
      </div>
      <div className="pt-5 border-t border-gray-300 flex justify-between">
        <button type="button" onClick={() => handleNavigation("login")}>
          <div className="flex space-x-3 text-sm items-center">
            <UserCircleIcon className="w-6 h-6" />
            <span>Я уже зарегистрирован</span>
          </div>
        </button>
        {info ? null : (
          <button type="button" onClick={() => handleNavigation("forward")}>
            <ArrowNarrowRightIcon className="w-6 h-6 text-orange" />
          </button>
        )}
      </div>
    </div>
  );
}
