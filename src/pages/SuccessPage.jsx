import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { call } from "../utils/api";
import Loader from "../components/Loader/Loader";
import { CircularProgress } from "@mui/material";

const SuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const order_id = params.get("order_id");
  const status_id = params.get("status");

  const [order, setOrder] = useState();

  useEffect(() => {
    if (order_id) {
      call(`api/orders/${order_id}`).then((rs) => {
        console.log(rs);
        setOrder(rs.data);
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 h-full p-6  md:mx-auto">
      {status_id != 2 ? (
        <>
          <svg
            viewBox="0 0 24 24"
            className="text-primary-600 w-20 h-20 mx-auto my-6"
          >
            <g>
              <path
                fill="currentColor"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
              />
            </g>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">
              Somthing went wrong. Please try again!
            </p>
            <p> Have a great day! </p>
          </div>
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            className="text-primary-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
          </div>
        </>
      )}

      {order ? (
        <div className="sm:w-[70%] w-full mt-7 mx-auto text-lg border p-10 rounded-xl border-gray-500 shadow-lg">
          <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-0 gap-2 mb-5">
            <div className="">
              <b>Order number:</b> #{order.id}
            </div>
            <div className="">
              <b>Order Date: </b>
              {new Date(order.created_at).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
            <div className="">
              <b>Status: </b>
              {status_id == 2 ? "Order paid Successfully" : "Order paid Failed"}
            </div>
          </div>
          <hr />

          <div className="text-xl my-5 font-semibold">Info Customer</div>
          <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-0 gap-2 mb-5 uppercase">
            <div className="">
              <b>Name: </b>
              {order.name}
            </div>
            <div className="">
              <b>Phone: </b>
              {order.phone}
            </div>
            <div className="">
              <b>Address: </b>
              {order.address}
            </div>
          </div>
          <hr />
          <div className="detail my-7">
            <div className="text-xl mb-5 font-semibold">Order Summary</div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
              {order.detail.map((item) => (
                <div className="flex gap-5 items-center" key={item.id}>
                  <img src={item.food.avatar} className="h-28 w-28" alt="" />
                  <div className="flex flex-col">
                    <span className="text-gray-800">{item.food.name}</span>
                    <span className="font-semibold">{item.unit_price} ₫</span>
                    <span className="text-gray-800">
                      Quantity {item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="my-8">
            <div className="text-xl mb-5 font-semibold">Order Total</div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{order.voucher?.discount || 0}%</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{parseFloat(order.total).toLocaleString()} ₫</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[500px] w-full flex justify-center items-center">
          <CircularProgress sx={{ color: "#EA736D" }} />
        </div>
      )}

      <div className="py-10 text-center ">
        <a
          href="/menu"
          className="px-12 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 rounded-lg duration-200"
        >
          GO TO MENU
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
