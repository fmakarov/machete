import React, { useContext, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { UserContext } from "../../contexts";
import axios from "axios";
import { setUser } from "../../contexts/actions";

export default function CheckoutNavigation({
  steps,
  selectedStep,
  setSelectedStep,
  details,
  setDetails,
  detailSlot,
  location,
  setLocation,
  locationSlot,
  setErrors,
}) {
  const { user, dispatchUser } = useContext(UserContext);
  const [showDatas, setShowDatas] = useState({
    error: { save: false, delete: false },
    success: { save: false, delete: false },
  });

  const handleAction = (action) => {
    if (steps[selectedStep].error && action !== "delete") {
      setShowDatas({
        error: true,
      });
      return;
    }

    const isDetails = steps[selectedStep].title === "Ваши данные";
    const isLocation = steps[selectedStep].title === "Адрес";

    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings",
        {
          details: isDetails && action !== "delete" ? details : undefined,
          detailSlot: isDetails ? detailSlot : undefined,
          location: isLocation && action !== "delete" ? location : undefined,
          locationSlot: isLocation ? locationSlot : undefined,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then((res) => {
        dispatchUser(setUser({ ...res.data, jwt: user.jwt, onboarding: true }));

        if (action === "save") {
          setShowDatas({ success: { save: true } });
        }

        if (action === "delete") {
          setErrors({});
          if (isDetails) {
            setDetails({ name: "", email: "", phone: "" });
          } else if (isLocation) {
            setLocation({ street: "", zip: "" });
          }
          setShowDatas({ success: { delete: true } });
        }
      })
      .catch((error) => {
        console.log(`Ошибка сохранения данных - ${error}`);
        if (action === "save") {
          setShowDatas({ error: { save: true } });
        }

        if (action === "delete") {
          setShowDatas({ error: { delete: true } });
        }
      });
  };

  return (
    <div className="flex items-center justify-between pb-2 border-b">
      {selectedStep === 0 || selectedStep === steps.length - 1 ? null : (
        <button
          type="button"
          className="p-2 hover:bg-gray-50 rounded"
          onClick={() => {
            setSelectedStep(selectedStep - 1);
          }}
        >
          <ArrowLeftIcon className="w-6 text-gray-500" />{" "}
        </button>
      )}
      <div className="md:text-2xl font-header font-semibold">
        {steps[selectedStep].title}
      </div>
      {selectedStep >= steps.length - 2 ? null : (
        <button
          type="button"
          disabled={steps[selectedStep].error}
          onClick={() => {
            setSelectedStep(selectedStep + 1);
          }}
          className="flex space-x-2 px-2 py-1 rounded bg-green-500 md:text-base text-sm text-white"
        >
          <span>Дальше</span> <ArrowRightIcon className="md:w-6 w-4 text-gray-200" />
        </button>
      )}
      {steps[selectedStep].hasActions && user.username !== "Guest" ? (
        <div className="flex space-x-5 ">
          <button
            type="button"
            className={
              showDatas.success.save === true
                ? "text-green-500"
                : `text-gray-500 hover:text-gray-700`
            }
            onClick={() => handleAction("save")}
          >
            <CheckCircleIcon className="w-6" />
          </button>
          <button
            type="button"
            className={
              showDatas.success.delete === true
                ? "hidden"
                : `text-gray-500 hover:text-gray-700`
            }
            onClick={() => handleAction("delete")}
          >
            <TrashIcon className="w-6" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
