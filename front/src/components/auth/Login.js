import React, { useState } from "react";
import axios from "axios";
import {
  UserCircleIcon,
  UserAddIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

import Fields from "./Fields";
import { setUser } from "../../contexts/actions";

export const EmailPassword = (hideEmail, hidePassword) => ({
  email: {
    helperText: "Введите корректный email",
    placeholder: "E-mail",
    type: "text",
    hidden: hideEmail,
  },
  password: {
    helperText:
      "Необходимо использовать хотя бы одну цифру, специальный символ и заглавную букву",
    placeholder: "Пароль",
    hidden: hidePassword,
    type: "password",
  },
});

export default function Login({ steps, setSelectedStep, user, dispatchUser }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [forgot, setForgot] = useState(false);

  const fields = EmailPassword(false, forgot);

  const navigateSignUp = () => {
    const signUp = steps.find((step) => step.label === "SignUp");
    setSelectedStep(steps.indexOf(signUp));
  };

  const handleLogin = () => {
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const disabled =
    Object.keys(errors).some((error) => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length;

  return (
    <div className="flex-col space-y-5 p-5">
      <div className="flex py-8 justify-center">
        <UserCircleIcon className="w-20" />
      </div>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <div className="py-5">
        <button
          type="button"
          disabled={!forgot && disabled}
          onClick={() => (forgot ? null : handleLogin())}
          className={`${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange bg-opacity-90 hover:bg-opacity-100"
          } text-white px-5 py-2 rounded`}
        >
          {forgot ? "Восстановить пароль" : "Войти"}
        </button>
      </div>
      <div className="pt-5 border-t border-gray-300 flex justify-between">
        <button onClick={navigateSignUp}>
          <div className="flex space-x-3 text-sm items-center">
            <UserAddIcon className="w-6 h-6" />
            <span>Зарегистрироваться</span>
          </div>
        </button>
        <button onClick={() => setForgot(!forgot)}>
          {!forgot ? (
            <div className="flex space-x-3 text-sm items-center">
              <QuestionMarkCircleIcon className="w-6 h-6" />
              <span>Восстановить пароль</span>
            </div>
          ) : (
            <XIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
