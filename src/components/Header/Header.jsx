import React, { useContext, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../stores/CartContext";
import { authContext } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";
import { call } from "../../utils/api";

// eslint-disable-next-line react/prop-types
const Header = ({ setCartOpen }) => {
  const navigate = useNavigate();
  const { state: stateCart, dispatch } = useContext(CartContext);
  // const [userInfo, setUserInfo] = useState();
  // const userInfo = useContext(authContext);
  const [userInfo, setUserInfo] = useState();
  const [search, setSearch] = useState("");
  console.log("🚀 ~ file: Header.jsx:16 ~ Header ~ search:", search);

  const handleSearch = (e) => {
    console.log(search);
    navigate("/menu", { state: { searchQuery: search }, replace: true });
  };
  const handleKeyDownSearch = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  console.log("🚀 ~ file: Header.jsx:11 ~ Header ~ userInfo:", userInfo);
  useEffect(() => {
    const getUserInfo = async () => {
      const rs = await call(`api/user`);
      setUserInfo(rs);
    };
    getUserInfo();
  }, []);

  return (
    <div className="w-full flex items-center gap-5 px-2">
      <div className="flex-1 lg:text-2xl sm:text-lg text-base font-semibold text-white text-start">
        To Your Door
        <div className="text-sm font-light sm:block hidden">
          {new Date().toLocaleString("en-us", {
            month: "short",
            weekday: "short",
            year: "numeric",
            day: "numeric",
          })}
        </div>
      </div>

      {userInfo ? (
        <span className="hover:underline">
          <Link to="/profile">
            Welcome, <b> {userInfo.name}</b>
          </Link>
        </span>
      ) : (
        <>
          <button className="px-4 py-2 rounded-full bg-dark-800 text-primary-600 hover:bg-primary-600 hover:text-white duration-200">
            <Link to="/register">Sign Up</Link>
          </button>
          <button className="px-4 py-2 rounded-full bg-dark-800 text-primary-600 hover:bg-primary-600 hover:text-white duration-200">
            <Link to="/login">Sign In</Link>
          </button>
        </>
      )}

      <label htmlFor="simple-search" className="sr-only ">
        Search
      </label>
      <div className="relative sm:block hidden">
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
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
        </button>
        <input
          type="text"
          id="simple-search"
          className="bg-[#393C49]   text-sm rounded-lg  block w-full pl-10 px-2.5 py-3  outline-none text-white"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDownSearch}
        />
      </div>

      <button
        className="p-3.5 rounded-lg bg-primary-600 text-white text-[1.7rem] relative"
        onClick={() => setCartOpen(true)}
      >
        {stateCart && stateCart.list.length > 0 && (
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-red-500 text-xs flex justify-center items-center">
            <span>{stateCart.list.length}</span>
          </div>
        )}
        <AiOutlineShoppingCart />
      </button>
    </div>
  );
};

export default Header;
