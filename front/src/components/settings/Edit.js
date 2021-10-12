import React, { useState } from "react";
import axios from "axios";
import { PencilIcon, SaveIcon } from "@heroicons/react/outline";

import { setUser } from "../../contexts/actions";

export default function Edit({
  edit,
  setEdit,
  details,
  locations,
  detailSlot,
  locationSlot,
  changesMade,
  user,
  dispatchUser,
  isError,
}) {
  const [viewError, setViewError] = useState(false);
  const handleEdit = () => {
    if (edit && isError) {
      setViewError(true);
    }

    setEdit(!edit);

    if (edit && changesMade) {
      const { password, ...newDetails } = details;
      axios
        .post(
          process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings",
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
          },
          { headers: { Authorization: `Bearer ${user.jwt}` } }
        )
        .then((response) => {
          dispatchUser(
            setUser({ ...response.data, jwt: user.jwt, onboarding: true })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className="flex-col space-y-5 pr-5 py-5">
      <div className="flex items-center space-x-5">
        <button type="button" onClick={handleEdit}>
          {edit ? (
            <SaveIcon className="w-10" />
          ) : (
            <PencilIcon className="w-10" />
          )}
        </button>
        <div className="p-3 text-red-400">
          {viewError ? "Необходимо заполнить поля" : ""}
        </div>
      </div>
    </div>
  );
}
