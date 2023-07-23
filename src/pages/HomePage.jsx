/* eslint-disable react/prop-types */
import React from "react";
import Footer from "../components/Footer/Footer";
import iconChef from "../assets/chef.svg";
import iconDeli from "../assets/delivery.svg";
import iconCooking from "../assets/cooking.svg";
import iconArrowRight from "../assets/arrowRight.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className=" ">
      <div className="section-1 relative bg-no-repeat bg-cover w-full h-[600px] px-32 bg-bottom bg-[url('https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')]">
        <div className="absolute top-0 z-10 text-white py-5 flex items-center justify-between w-[80%]">
          <button className="font-Knewave text-2xl">Food Order Website</button>
          <div className="flex gap-10">
            <a href="">Home</a>
            <a href="">About</a>
            <Link to="/menu">Menu</Link>
            <a href="">Contact</a>
          </div>
        </div>
        <div className="w-[600px] text-white flex flex-col h-full justify-center items-start gap-7">
          <div className="font-Knewave text-6xl">
            Premium and authentic cooking from the experts
          </div>
          <div className="text-gray-500 text-lg">
            Feel the sensation Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Adipisci{" "}
          </div>
          <button className="bg-yellow-400 text-black w-fit px-4 py-2 font-semibold">
            Menu
          </button>
        </div>
      </div>
      <div className="section-2 px-20 py-20">
        <div className="flex flex-col gap-5 mb-7 text-center">
          <div className="font-bold">Our Featured Food</div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit vel sequi, voluptate porro modi
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="w-60 h-[400px] flex items-end bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')]">
            <span className="ml-7 mb-4 text-white">See All Menu</span>
          </div>
          <div className="w-60 h-[400px] flex items-end bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')]">
            <span className="ml-7 mb-4 text-white">See All Menu</span>
          </div>
          <div className="w-60 h-[400px] flex items-end bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')]">
            <span className="ml-7 mb-4 text-white">See All Menu</span>
          </div>
          <div className="w-60 h-[400px] flex items-end bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')]">
            <span className="ml-7 mb-4 text-white">See All Menu</span>
          </div>
        </div>
      </div>
      <div className="section-3 px-20 py-10 bg-zinc-800 text-white">
        <div className="flex flex-col gap-5 mb-7 text-center">
          <div className="font-bold">Our Categorised Menu</div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit vel sequi, voluptate porro modi
          </div>
        </div>
        <div className="h-[400px] ">SECTION 3</div>
      </div>
      <div className="section-4 px-[15%] py-36 flex">
        <div className="h-[400px] w-[500px] relative rounded">
          <img
            className="w-full h-full object-cover shadow-xl rounded"
            src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt=""
          />
          {/* <div className="w-full h-full">123</div> */}
        </div>
        <div className="flex flex-col gap-8 justify-center text-white  px-20 py-5 w-[650px] relative">
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
          <button className="bg-yellow-400 text-black w-fit px-4 py-2 flex items-center gap-5 z-10">
            <div>Order Now</div>
            <img src={iconArrowRight} className="w-5 h-5" alt="" />
          </button>
          <div className="absolute -z-10  rounded shadow-xl h-[480px] pl-36 bg-gray-900 w-full -left-[10%]"></div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
