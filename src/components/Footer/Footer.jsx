import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-zinc-800 flex items-center gap-16 px-16 py-20 text-white">
        <div className="basis-1/4">
          <button className="font-Knewave text-2xl">Food Order Website</button>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold">Visit</div>
          <div className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Architecto, animi vero similique fugit ipsa{" "}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold">Store</div>
          <div className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Architecto, animi vero similique fugit ipsa{" "}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-semibold">About Us</div>
          <a href="">About Us</a>
        </div>
      </div>
      <div className="bg-black text-gray-600 p-7 text-center">
        © 2023 - Copyright TDTU University. All right reserved
      </div>
    </div>
  );
};

export default Footer;
