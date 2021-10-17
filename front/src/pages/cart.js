import React, { useContext } from "react";
import CartItems from "../components/cart/CartItems";
import CheckoutPortal from "../components/cart/CheckoutPortal";
import { UserContext } from "../contexts";
import Layout from "./layout";

export default function Cart() {
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <div className="max-w-7xl mx-auto md:pb-16">
        <div className="flex justify-between md:py-10 py-3 items-center px-4 md:px-0">
          <div className="font-roboto text-2xl font-semibold">Корзина</div>
          <div>{user.username}</div>
        </div>
        <div className="flex md:flex-row flex-col md:space-x-5 space-y-8 md:space-y-0">
          <CartItems />
          <CheckoutPortal user={user} />
        </div>
      </div>
    </Layout>
  );
}
