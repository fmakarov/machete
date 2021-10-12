import React, { Fragment, useContext } from "react";

import {
  ShoppingBagIcon,
  UserCircleIcon,
  PhoneIncomingIcon,
  MenuIcon,
  XIcon,
  ChatAltIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "gatsby";
import { CartContext } from "../../contexts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Nav = ({ cats }) => {
  const imgUrl = process.env.GATSBY_STRAPI_URL;
  const { cart } = useContext(CartContext);

  return (
    <Popover className="relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center md:justify-start md:space-x-10 px-4 md:px-0">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <div className="flex space-x-2 items-center">
              <a href="/">
                <span className="font-bold">Alif</span>
                <span className="italic font-semibold">Ko</span>
              </a>
              <div className="text-xs italic hidden md:flex">
                интернет магазин экспресс-доставки
              </div>
            </div>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Меню</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10 items-center"
          >
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "" : "",
                      "group inline-flex items-center font-semibold text-xs"
                    )}
                  >
                    <span>Каталог</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? "text-gray-600" : "text-gray-400",
                        "ml-2 h-5 w-5 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute subnav z-10 -ml-4 mt-3 transform px-2 w-screen max-w-5xl sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid grid-cols-3 gap-4 bg-yellow-300 p-4 sm:gap-4 items-center sm:p-8 text-main text-sm">
                          {cats.map((route) => {
                            return (
                              <a
                                key={route.node.strapiId}
                                href={`/cat/${route.node.slug}`}
                                className="-m-3 p-2 flex hover:underline"
                              >
                                <div className="ml-4">
                                  <p>{route.node.title}</p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <a href="/new" className="font-semibold text-xs hover:underline">
              Новинки
            </a>
            <a
              href="/services/vozvrat-tovara"
              className="font-semibold text-xs hover:underline"
            >
              Возврат
            </a>
            <a
              href="/services/dostavka"
              className="font-semibold text-xs hover:underline"
            >
              Доставка
            </a>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-5">
            <Link to="/cart" className="relative pl-3">
              {cart.length > 0 ? (
                <div className="absolute -right-2 bg-white rounded-full h-3 w-4 ml-5 flex items-center">
                  <span className="w-full text-center text-orange text-xs font-semibold">
                    {cart.length}
                  </span>
                </div>
              ) : null}
              <ShoppingBagIcon className="w-5 text-main " />
            </Link>
            <ChatAltIcon className="w-5 text-main" />
            <Link to="/account">
              <UserCircleIcon className="w-5 text-main" />
            </Link>
            <div className="flex space-x-3 items-center font-bold text-sm">
              <PhoneIncomingIcon className="w-5 md:block hidden" />{" "}
              <span>8 (800) 222-23-45</span>
            </div>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden"
        >
          <div className="shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </div>
                <div className="flex space-x-3 items-center font-bold">
                  <PhoneIncomingIcon className="w-6 md:block hidden" />
                  <span>8 (800) 222-23-45</span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-2 px-5 space-y-6">
              <div className="grid grid-cols-3 gap-y-4 gap-x-4 text-gray-200 font-header font-bold">
                <a href="#">Каталог</a>
                <a href="#">Новинки</a>
                <a href="#">Бренды</a>
                <a href="#">Акции</a>
                <a href="#">Контакты</a>
                <a href="/cart">Корзина</a>
              </div>
              <div>
                <a
                  href="/account"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Войти
                </a>
                <p className="mt-6 text-center text-sm font-medium text-gray-500">
                  Нет аккаунта?{" "}
                  <a href="#" className="text-gray-300 hover:text-gray-50">
                    Зарегистрироваться
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Nav;
