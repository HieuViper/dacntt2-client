/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { callNon } from "../../utils/api";
import { AiFillFacebook, AiFillGithub, AiFillInstagram } from "react-icons/ai";

const Footer = ({ store }) => {
  const navigate = useNavigate();

  const handleNavigateStore = async (item) => {
    const rs = await callNon(`api/food?store_id=${item.id}`);

    navigate("/menu", { state: { selectStore: rs, storeID: item.id } });
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-5 grid-cols-2  bg-zinc-800 gap-16 md:px-16 px-6 md:py-20 py-10 text-white">
        <div className="lg:col-span-2 md:col-auto col-span-2 flex items-center justify-center">
          <button
            onClick={() => navigate("/")}
            className="font-Knewave text-4xl"
          >
            To Your Door
          </button>
        </div>
        <div className="flex flex-col gap-5 md:col-span-2 lg:col-auto col-auto">
          <div className="font-semibold text-xl">Visit</div>
          <div className="leading-7">
            Welcome to our online food delivery platform! Explore a diverse menu
            of delightful dishes and experience the convenience of ordering food
            online. Indulge in amazing flavors right at the comfort of your home
            with us.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold text-xl">Store</div>
          <ul className="flex flex-col gap-3">
            {store &&
              store.map((item) => (
                <li
                  key={item.id}
                  className="text-[#ccc] cursor-pointer underline hover:text-primary-600"
                  onClick={() => handleNavigateStore(item)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5 md:col-auto col-span-2">
          <div className="font-semibold text-xl">Contact Us</div>
          <span>
            Phone: <b>+84123456789</b>
          </span>
          <span className="break-words">
            Email: <b>51900741@student.tdtu.edu.vn</b>
          </span>

          <input
            type="text"
            className="px-4 py-3 outline-none text-[#ccc] text-sm rounded w-full"
            name=""
            placeholder="Enter your email to get discount!!!"
            id=""
          />
          <button className="px-4 py-3 bg-primary-600 hover:bg-primary-500 justify-center rounded-lg shadow-lg duration-200 text-white text-lg uppercase flex items-center gap-2">
            Subcribe Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>

          <div className="social flex items-center gap-5">
            <button className="fb">
              <AiFillFacebook size="2rem" />
            </button>
            <button className="github">
              <AiFillGithub size="2rem" />
            </button>
            <button className="instagram">
              <AiFillInstagram size="2rem" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black text-gray-600 p-7 text-center">
        © 2023 - Copyright TDTU University. All right reserved
      </div>
    </div>
  );
};

export default Footer;
