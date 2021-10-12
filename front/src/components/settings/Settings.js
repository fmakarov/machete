import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts";
import Details from "./Details";
import Edit from "./Edit";
import Location from "./Location";
import Payments from "./Payments";

export default function Settings() {
  const { user, dispatchUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [detailValues, setDetailValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  });
  const [detailSlot, setDetailSlot] = useState(0);
  const [detailErrors, setDetailErrors] = useState({});
  const [locationValues, setLocationValues] = useState({
    street: "",
    zip: ""
  });
  const [locationSlot, setLocationSlot] = useState(0);
  const [locationErrors, setLocationErrors] = useState({});

  const [billingSlot, setBillingSlot] = useState(0);

  const allErrors = { ...detailErrors, ...locationErrors };
  const isError = Object.keys(allErrors).some(
    (error) => allErrors[error] === true
  );
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setDetailErrors({});
  }, [detailSlot]);

  useEffect(() => {
    setLocationErrors({});
  }, [locationSlot]);

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        <Details
          user={user}
          edit={edit}
          values={detailValues}
          setValues={setDetailValues}
          slot={detailSlot}
          setSlot={setDetailSlot}
          setEdit={setEdit}
          setChangesMade={setChangesMade}
          errors={detailErrors}
          setErrors={setDetailErrors}
        />
        <Payments
          user={user}
          edit={edit}
          // setEdit={setEdit}
          slot={billingSlot}
          setSlot={setBillingSlot}
        />
        <Location
          values={locationValues}
          setValues={setLocationValues}
          user={user}
          edit={edit}
          setChangesMade={setChangesMade}
          slot={locationSlot}
          setSlot={setLocationSlot}
          errors={locationErrors}
          setErrors={setLocationErrors}
          setEdit={setEdit}
          details={detailValues}
          locations={locationValues}
        />
        <Edit
          user={user}
          edit={edit}
          setEdit={setEdit}
          dispatchUser={dispatchUser}
          changesMade={changesMade}
          details={detailValues}
          locations={locationValues}
          detailSlot={detailSlot}
          locationSlot={locationSlot}
          isError={isError}
        />
      </div>
    </>
  );
}
