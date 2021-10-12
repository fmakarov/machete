import React, { useContext } from "react";
import CartItems from "../components/cart/CartItems";
import CheckoutPortal from "../components/cart/CheckoutPortal";
import { UserContext } from "../contexts";
import Layout from "./layout";

export default function Cart() {
  const { user } = useContext(UserContext);
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between py-10 items-center">
          <div className="font-roboto text-2xl font-semibold">Корзина</div>
          <div>{user.username}</div>
        </div>
        <div className="flex space-x-5">
          <CartItems />
          <CheckoutPortal user={user} />
        </div>
      </div>
    </Layout>
  );
}
