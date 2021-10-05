import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts";

import Complete from "./Complete";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthPortal() {
  const [selectedStep, setSelectedStep] = useState(0);
  const { user, dispatchUser } = useContext(UserContext);

  const steps = [
    { component: Login, label: "Login" },
    { component: SignUp, label: "SignUp" },
    { component: Complete, label: "Complete" },
  ];

  return (
    <div className="max-w-xl mx-auto py-20">
      <div className="p-5 bg-gray-100">
        {steps.map((Step, i) => {
          return selectedStep === i ? (
            <Step.component
              setSelectedStep={setSelectedStep}
              steps={steps}
              user={user}
              dispatchUser={dispatchUser}
              key={Step.label}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
