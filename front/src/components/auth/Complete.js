import React, { useEffect } from "react";
import { Link } from "gatsby";
import { CheckCircleIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { setUser } from "../../contexts/actions";

export default function Complete({ user, dispatchUser }) {
  useEffect(() => {
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }));
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="self-center">
        <CheckCircleIcon className="w-40 text-green-600" />
      </div>
      <div className="text-center py-5">Регистрация успешно завершена</div>
      <div className="flex space-x-5 items-center self-center border-t-2 pt-5 uppercase font-header font-semibold">
        <ShoppingBagIcon className="w-10 h-10" />
        <Link to="/" className="hover:underline hover:text-green-600">
          За покупками
        </Link>
      </div>
    </div>
  );
}
