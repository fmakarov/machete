import React, { useContext, useState } from "react";
import {
  ClipboardIcon,
  CogIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

import { UserContext } from "../../contexts";
import { setUser } from "../../contexts/actions";
import Settings from "./Settings";

export default function SettingsPortal() {
  const { user, dispatchUser, defaultUser } = useContext(UserContext);
  const [component, setComponent] = useState("");

  const buttons = [
    {
      label: "Настройки",
      icon: <CogIcon className="w-6 h-6" />,
      component: "Settings",
    },
    {
      label: "История заказов",
      icon: <ClipboardIcon className="w-6 h-6" />,
      component: "History",
    },
  ];

  const components = [{ label: "Settings", component: <Settings /> }];

  const handleComponent = (component) => {
    setComponent(component);
  };

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser));
  };

  return (
    <>
      <div className="bg-main bg-opacity-25">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between py-5 items-center text-sm">
            <div className="flex space-x-3 text-gray-700">
              <UserCircleIcon className="w-6 h-6" />
              <span>hello, {user.username}</span>
            </div>
            <div className="flex space-x-5">
              {buttons.map((button) => {
                return (
                  <div
                    key={button.label}
                    className="flex space-x-1 items-center hover:underline"
                  >
                    <div>{button.icon}</div>
                    <button
                      type="button"
                      onClick={() => handleComponent(button.component)}
                    >
                      {button.label}
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={handleLogout}
                className="py-1 px-2 bg-gray-500 hover:bg-gray-600 rounded-sm text-white"
              >
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-8">
        {components.map((it) => {
          if (it.label === component) {
            return it.component;
          }
        })}
      </div>
    </>
  );
}
