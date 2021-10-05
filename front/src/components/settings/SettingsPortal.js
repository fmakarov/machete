import {
  ClipboardCopyIcon,
  ClipboardIcon,
  CogIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import React, { useContext } from "react";
import { UserContext } from "../../contexts";

export default function SettingsPortal() {
  const { user } = useContext(UserContext);
  // const handleLogout = () => {
  //   dispatchUser(setUser(defaultUser));
  // };

  const buttons = [
    { label: "Настройки", icon: <CogIcon className="w-6 h-6" /> },
    { label: "История заказов", icon: <ClipboardIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-main bg-opacity-25">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between p-5 items-center text-sm">
          <div className="flex space-x-3 text-gray-700">
            <UserCircleIcon className="w-6 h-6" />
            <span>hello, {user.username}</span>
          </div>
          <div className="flex space-x-5">
            {buttons.map((button) => {
              return (
                <div key={button.label} className="flex space-x-1 items-center hover:underline">
                  <div>{button.icon}</div>
                  <button type="button">{button.label}</button>
                </div>
              );
            })}
          </div>
          <div>
            <button
              type="button"
              className="py-1 px-2 bg-gray-500 hover:bg-gray-600 rounded-sm text-white"
            >
              Выход
            </button>
          </div>
        </div>

        {/* <button type="button" onClick={() => handleLogout()}>
          logout
        </button> */}
      </div>
    </div>
  );
}
