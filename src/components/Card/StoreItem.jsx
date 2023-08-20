/* eslint-disable react/prop-types */
import React from "react";
import "./store-item.css";

const StoreItem = ({ direction, data, setStoreIDSelectied }) => {
  return (
    <div className="h-[500px] relative flex shadow">
      {/* <div className="box h-[400px] w-full flex">
        <div className="relative w-full">
          <img
            className="h-full w-full object-cover z-10 relative rounded-lg"
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
          <div className="right bg-[#b25b5b] text-white text-sm flex flex-col gap-5 h-full justify-center pr-10 pl-[70%] items-start w-full rounded-lg">
            <span className="text-3xl font-semibold">cua hang so 1</span>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              eligcta qui!
            </span>
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
              quod cupiditate numquam unde deleniti? Nesciunt facilis dicta
              voluptas, ex iusto asperiores voluptate magnam nihil nisi quidem
              dolore alias, veritatis fugit.
            </span>
            <a
              href="#_"
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium bg-white  transition duration-300 ease-out rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full  duration-300 -translate-x-full bg-yellow-400 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-[#b25b5b] transition-all duration-300 transform group-hover:translate-x-full ease">
                Explore Now
              </span>
              <span className="relative invisible">Explore Now</span>
            </a>
          </div>
        </div>
      </div> */}

      <div className="box h-full w-full flex">
        <div className="relative w-full">
          <div
            className={`${
              direction != "left"
                ? "pl-10 pr-[70%] items-start"
                : "pr-10 pl-[70%] items-start"
            } left bg-[#b25b5b] text-white text-sm flex flex-col gap-5 h-full justify-center w-full rounded-lg`}
          >
            <span className="text-3xl font-semibold">{data.name}</span>
            <span>{data.address}</span>
            <span>{data.description}</span>
            <button
              onClick={() => {
                setStoreIDSelectied(data.id);
              }}
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium bg-white  transition duration-300 ease-out rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full  duration-300 -translate-x-full bg-yellow-400 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-[#b25b5b] transition-all duration-300 transform group-hover:translate-x-full ease">
                Explore Now
              </span>
              <span className="relative invisible">Explore Now</span>
            </button>
          </div>

          <img
            className={`h-full w-full object-cover z-10 relative rounded-lg  ${
              direction == "left" ? "img-left" : "img-right"
            }`}
            src={data.avatar}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
