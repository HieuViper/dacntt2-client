import React, { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../stores/CartContext";

// eslint-disable-next-line react/prop-types
const Header = ({ setCartOpen }) => {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div className="w-full flex items-center gap-5 px-2">
      <div className="flex-1 text-2xl font-semibold text-white text-start">
        Food Order Website
        <div className="text-base font-light">
          {new Date().toLocaleString("en-us", {
            month: "short",
            weekday: "short",
            year: "numeric",
            day: "numeric",
          })}
        </div>
      </div>

      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-[#393C49]   text-sm rounded-lg  block w-full pl-10 px-2.5 py-3  outline-none text-white"
          placeholder="Search"
          required
        />
      </div>

      <button
        className="p-3.5 rounded-lg bg-primary-600 text-white text-[1.7rem] relative"
        onClick={() => setCartOpen(true)}
      >
        {state && state.list.length > 0 && (
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-red-500 text-xs flex justify-center items-center">
            <span>{state.list.length}</span>
          </div>
        )}
        <AiOutlineShoppingCart />
      </button>
    </div>
  );
};

export default Header;
