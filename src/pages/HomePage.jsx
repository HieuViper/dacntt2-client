/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import iconChef from "../assets/chef.svg";
import iconDeli from "../assets/delivery.svg";
import iconCooking from "../assets/cooking.svg";
import iconArrowRight from "../assets/arrowRight.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { callNon } from "../utils/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [featureFood, setFeatureFood] = useState();
  const [featureStore, setFeatureStore] = useState();

  const handleNavigateStore = async (item) => {
    const rs = await callNon(`api/food?store_id=${item.id}`);

    navigate("/menu", { state: { selectStore: rs, storeID: item.id } });
  };

  useEffect(() => {
    callNon(`api/food?page=1&page_size=4`).then((res) => {
      setFeatureFood(res.data);
      console.log("🚀 ~ file: HomePage.jsx:17 ~ callNon ~ res:", res);
    });

    callNon(`api/stores?page=1&page_size=6`).then((res) => {
      setFeatureStore(res.data);
    });
  }, []);
  return (
    <div className=" ">
      <div className="section-1 relative bg-no-repeat bg-cover w-full h-[600px] bg-bottom bg-[url('https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')]">
        <div className="absolute top-0 z-10 text-white py-5 md:px-32 px-5 flex items-center justify-between w-full">
          <button className="font-Knewave md:text-2xl text-sm">
            To Your Door
          </button>
          <div className="flex md:gap-10 gap-5 font-semibold">
            <a href="/" className=" hover:text-primary-600 duration-200">
              Home
            </a>
            <a href="/stores" className=" hover:text-primary-600 duration-200">
              Stores
            </a>
            <a href="/menu" className=" hover:text-primary-600 duration-200">
              Menu
            </a>
            <a href="/about" className=" hover:text-primary-600 duration-200">
              About
            </a>
          </div>
        </div>
        <div className="w-[50%] text-white flex flex-col h-full justify-center items-start gap-7 md:px-32 px-5">
          <div className="font-Knewave md:text-4xl text-2xl">
            Premium and authentic cooking from the experts
          </div>
          <div className="text-gray-500 md:text-lg text-sm">
            Feel the sensation Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Adipisci{" "}
          </div>
          <button className="bg-primary-600 text-white w-fit px-4 py-2 font-semibold hover:opacity-75 duration-200 rounded-lg">
            <Link to="/menu">Menu</Link>
          </button>
        </div>
      </div>

      <div className="section-2 md:px-20 px-10 py-12 ">
        <div className="flex flex-col gap-3 mb-10 text-center">
          <div className="font-bold text-3xl">Our Featured Food</div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit vel sequi, voluptate porro modi
          </div>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12">
          {featureFood &&
            featureFood.map((item) => (
              <div
                key={item.id}
                className={`h-[400px] w-full flex items-end relative`}
              >
                <img
                  src={item.avatar}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <button
                  onClick={() =>
                    navigate(`/food/${item.id}`, {
                      state: {
                        food_id: item.id,
                        store_id: item.food_group.store_id,
                      },
                    })
                  }
                  className="ml-7 mb-4 text-primary-600 flex items-center gap-2 absolute bottom-3 cursor-pointer hover:gap-4 duration-200"
                >
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
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                  See All Menu
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="section-3 md:px-20 px-10 py-10 bg-zinc-800 text-white">
        <div className="flex flex-col gap-5 mb-10 text-center">
          <div className="font-bold text-3xl">Our Stores</div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit vel sequi, voluptate porro modi
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-10">
          {featureStore &&
            featureStore.map((item) => (
              <div className="" key={item.id}>
                <div className="font-semibold text-lg text-center mb-2">
                  {item.name}
                </div>
                <button
                  className="h-[300px] relative rounded-lg shadow-xl"
                  onClick={() => handleNavigateStore(item)}
                >
                  <img
                    src={item.avatar}
                    className="w-full h-full object-cover opacity-90 rounded-lg shadow-xl"
                    alt=""
                  />
                  {/* <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600 text-center">
                  {item.name}
                </span> */}
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="section-4 md:px-[15%] px-[5%] py-24 flex items-center">
        <div className="h-[400px] w-[500px] relative rounded hidden md:block">
          <img
            className="w-full h-full object-cover shadow-xl rounded"
            src="https://images.unsplash.com/photo-1478144592103-25e218a04891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
            alt=""
          />
        </div>
        <div className="flex-col gap-8 justify-center text-white md:px-20 px-0 py-5 w-[650px] relative hidden md:flex">
          <div className="text-3xl font-semibold">
            What you can if you order food from us
          </div>
          <div className="flex items-center gap-5">
            <img src={iconChef} alt="" className="w-10 h-10 text-white" />
            Cooked by a professional chef in his field
          </div>

          <div className="flex items-center gap-5">
            <img src={iconDeli} alt="" className="w-10 h-10 text-white" />
            Quick delivery and provising so you don't wait long
          </div>
          <div className="flex items-center gap-5">
            <img src={iconCooking} alt="" className="w-10 h-10 text-white" />
            Taste cuisine with a taste have never tasted before
          </div>
          <button
            onClick={() => navigate(`/menu`)}
            className="bg-primary-600 text-white rounded  w-fit px-4 py-2 flex items-center gap-5 z-10 hover:opacity-75 duration-200"
          >
            <div>Order Now</div>
            <IoIosArrowRoundForward color="white" size="1.75rem" />
          </button>
          <div className="absolute -z-10 rounded shadow-xl h-[480px] pl-36 bg-gray-900 w-full -left-[8%]"></div>
        </div>
        {/* for small screen */}
        <div className="flex flex-col gap-8 justify-center text-white px-20 py-5 w-full h-full bg-gray-900 relative md:hidden">
          <div className="text-3xl font-semibold">
            What you can if you order food from us
          </div>
          <div className="flex items-center gap-5">
            <img src={iconChef} alt="" className="w-10 h-10 text-white" />
            Cooked by a professional chef in his field
          </div>

          <div className="flex items-center gap-5">
            <img src={iconDeli} alt="" className="w-10 h-10 text-white" />
            Quick delivery and provising so you don't wait long
          </div>
          <div className="flex items-center gap-5">
            <img src={iconCooking} alt="" className="w-10 h-10 text-white" />
            Taste cuisine with a taste have never tasted before
          </div>
          <button
            onClick={() => navigate(`/menu`)}
            className="bg-primary-600 text-white rounded w-fit px-4 py-2 flex items-center gap-5 z-10 hover:opacity-75 duration-200"
          >
            <div>Order Now</div>
            <IoIosArrowRoundForward color="white" size="1.75rem" />{" "}
          </button>
        </div>
      </div>
      <div className="">
        {" "}
        <Footer store={featureStore} />{" "}
      </div>
    </div>
  );
};

export default HomePage;
