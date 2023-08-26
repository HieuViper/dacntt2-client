/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import paypal from "../../assets/paypal.svg";
import vnpay from "../../assets/vnpay.svg";
import momo from "../../assets/momo.svg";
import shipcod from "../../assets/shipcod.svg";
import check from "../../assets/check.svg";
import { toast } from "react-toastify";
import { call } from "../../utils/api";
import { CartContext } from "../../stores/CartContext";
import { authContext } from "../../utils/auth";
import Loader from "../Loader/Loader";

// eslint-disable-next-line react/prop-types
const Payment = ({ setOpenPayment, setCartOpen, cartData, dispatchCart }) => {
  console.log("🚀 ~ file: Payment.jsx:14 ~ Payment ~ cartData:", cartData);
  // const userInfo = useContext(authContext);
  const [userInfo, setUserInfo] = useState();
  console.log("🚀 ~ file: Payment.jsx:19 ~ Payment ~ userInfo:", userInfo);
  const [loading, setLoading] = useState(false);

  const [choosen, setChoosen] = useState();
  const [paymentData, setPaymentData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handlePayment = () => {
    setLoading(true);
    // setCartOpen(false);
    if (!paymentData.name) {
      toast.error("Please enter your name!");
    } else if (!paymentData.address) {
      toast.error("Please enter your address!");
    } else if (!paymentData.phone) {
      toast.error("Please enter your phone!");
    } else if (!choosen) {
      toast.error("Please choose a payment type!");
    } else {
      const cartItems = [];
      // eslint-disable-next-line react/prop-types
      cartData.list.map((item) => {
        if (item.discount > 0) {
          cartItems.push({
            id: item.id,
            quantity: item.quantity,
            price: item.discounted_price,
          });
        } else {
          cartItems.push({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          });
        }
        // cartItems.push({
        //   id: item.id,
        //   quantity: item.quantity,
        //   price: item.price,
        // });
      });
      const addData = {
        name: paymentData.name,
        phone: paymentData.phone,
        address: paymentData.address,
        voucher_id: cartData.voucherID,
        customer_id: userInfo.id,
        payment_type: choosen,
        store_id: cartData.storeID,
        items: cartItems,
      };
      console.log(
        "🚀 ~ file: Payment.jsx:58 ~ handlePayment ~ addData:",
        addData
      );
      setCartOpen(false);
      setOpenPayment(false);

      call(`api/orders`, "POST", addData).then((rs) => {
        console.log(rs);
        if (rs.status == 200) {
          dispatchCart({ type: "clearCart" });
          setLoading(false);

          toast.success("Order Successfully!!!", { autoClose: 1000 });
          setTimeout(() => {
            window.open(rs.confirmation_url, "_blank");
          }, 1000);
        } else {
          let entries = Object.entries(rs.data.errors);
          console.log(
            "🚀 ~ file: AddUserPage.jsx:68 ~ .then ~ entries:",
            entries
          );
          setLoading(false);
          entries.map(([key, value]) => {
            console.log("loi ne", key, value);

            toast.error(value[0], {
              autoClose: 2000,
            });
          });
        }
        () => setOpenPayment(false);
      });
    }
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const rs = await call(`api/user`);
      setUserInfo(rs);
    };
    getUserInfo();
  }, []);

  return (
    <div className="bg-dark-800 w-full h-full text-white rounded-lg p-6 flex flex-col overflow-y-scroll">
      <div className="text-2xl py-2 font-semibold flex items-center justify-between">
        <span>Payment</span>
      </div>

      <div className={`flex-1 my-5 border-y-[1px] border-[#393C49] py-3`}>
        <div className="text-xl font-semibold py-3">Payment Method</div>
        <div className="flex items-center gap-4 overflow-x-scroll w-full">
          <button
            onClick={() => setChoosen(1)}
            className={`border  ${
              choosen == 1
                ? "border-white text-white"
                : "border-[#393C49] text-[#ABBBC2]"
            } px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm relative`}
          >
            <div className="">
              <img src={momo} alt="" className="" />
            </div>
            <div className="">Momo</div>
            <div
              className={`${
                choosen == 1 ? "block" : "hidden"
              } absolute top-2 right-2`}
            >
              <img src={check} alt="" className="" />
            </div>
          </button>

          <button
            onClick={() => setChoosen(2)}
            className={`border  ${
              choosen == 2
                ? "border-white text-white"
                : "border-[#393C49] text-[#ABBBC2]"
            } px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm relative`}
          >
            <div className="">
              <img src={vnpay} alt="" />
            </div>
            <div className="">VNPay</div>
            <div
              className={`${
                choosen == 2 ? "block" : "hidden"
              } absolute top-2 right-2`}
            >
              <img src={check} alt="" className="" />
            </div>
          </button>

          <button
            onClick={() => setChoosen(3)}
            className={`border  ${
              choosen == 3
                ? "border-white text-white"
                : "border-[#393C49] text-[#ABBBC2]"
            } px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm relative`}
          >
            <div className="">
              <img src={paypal} alt="" />
            </div>
            <div className="">Paypal</div>
            <div
              className={`${
                choosen == 3 ? "block" : "hidden"
              } absolute top-2 right-2`}
            >
              <img src={check} alt="" className="" />
            </div>
          </button>

          <button
            onClick={() => setChoosen(4)}
            className={`border  ${
              choosen == 4
                ? "border-white text-white"
                : "border-[#393C49] text-[#ABBBC2]"
            } px-7 py-3 rounded-xl w-fit flex flex-col items-center gap-1 justify-center text-sm relative`}
          >
            <div className="">
              <img src={shipcod} alt="" />
            </div>
            <div className="">Ship&nbsp;COD</div>
            <div
              className={`${
                choosen == 4 ? "block" : "hidden"
              } absolute top-2 right-2`}
            >
              <img src={check} alt="" className="" />
            </div>
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
              onChange={(e) =>
                setPaymentData({ ...paymentData, name: e.target.value })
              }
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
              onChange={(e) =>
                setPaymentData({ ...paymentData, address: e.target.value })
              }
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
              onChange={(e) =>
                setPaymentData({ ...paymentData, phone: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex items-center sm:gap-5 gap-2">
        <button
          onClick={() => setOpenPayment(false)}
          className="text-primary-600 border-primary-600 border rounded-2xl w-full py-4 hover:bg-red-600 hover:border-red-600 hover:text-white duration-200"
        >
          Cancel
        </button>
        <button
          className={`text-white bg-primary-600 font-semibold rounded-xl w-full py-4 px-1 ${
            loading ? "opacity-75 select-none" : ""
          }`}
          onClick={handlePayment}
        >
          {loading ? <Loader /> : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
