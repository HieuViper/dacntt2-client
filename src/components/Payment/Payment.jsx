import React from "react";
import { motion } from "framer-motion";
import paypal from "../../assets/paypal.svg";
import vnpay from "../../assets/vnpay.svg";
import momo from "../../assets/momo.svg";

const Payment = () => {
  return (
    <div className="bg-dark-800 w-[600px] h-full text-white rounded-lg p-6 flex flex-col overflow-y-scroll">
      <div className="text-2xl font-semibold flex items-center justify-between">
        <span>Payment</span>
      </div>

      <div className={`flex-1 my-5 border-y-[1px] border-[#393C49] py-3`}>
        <div className="text-xl font-semibold py-3">Payment Method</div>
        <div className="flex items-center gap-4">
          <button className="border border-[#393C49] text-[#ABBBC2] px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm">
            <div className="">
              <img src={paypal} alt="" />
            </div>
            <div className="">Paypal</div>
          </button>
          <button className="border border-[#393C49] text-[#ABBBC2] px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm">
            <div className="">
              <img src={momo} alt="" />
            </div>
            <div className="">Momo</div>
          </button>
          <button className="border border-[#393C49] text-[#ABBBC2] px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm">
            <div className="">
              <img src={vnpay} alt="" />
            </div>
            <div className="">VNPay</div>
          </button>
        </div>

        <div className="flex flex-col gap-4 my-3">
          <div className="flex flex-col gap-1 ">
            <div className="">Name</div>
            <input
              type="text"
              className="p-4 w-full rounded-lg text-[#E0E6E9] bg-[#2D303E] outline-none "
              placeholder="Enter your Name"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="">Address</div>
            <input
              type="text"
              className="p-4 w-full rounded-lg text-[#E0E6E9] bg-[#2D303E] outline-none "
              placeholder="Enter your Address"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="">Phone</div>
            <input
              type="text"
              className="p-4 w-full rounded-lg text-[#E0E6E9] bg-[#2D303E] outline-none "
              placeholder="Enter your Phone"
              name=""
              id=""
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-primary-600 border-primary-600 border rounded-2xl w-full py-4 hover:bg-red-600 hover:border-red-600 hover:text-white duration-200">
          Cancel
        </button>
        <button className="text-white bg-primary-600 font-semibold rounded-xl w-full py-4">
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
