/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../stores/CartContext";
import cartEmpty from "../../assets/cartEmpty.svg";
import { call } from "../../utils/api";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Cart = ({
  setCartOpen,
  state,
  dispatch,
  setOpenPayment,
  openPayment,
}) => {
  const [total, setTotal] = useState();
  console.log("🚀 ~ file: Cart.jsx:18 ~ total:", total);
  const [coupon, setCoupon] = useState();
  const [discountPercent, setDiscountPercent] = useState();

  const handleContinue = async () => {
    if (coupon) {
      const rs = await call(`api/get-voucher-by-code/${coupon}`);
      // .then((rs) => {
      console.log("🚀 ~ file: Cart.jsx:24 ~ handleContinue ~ rs:", rs);
      if (rs.status == 200) {
        dispatch({ type: "addVoucherID", item: rs.data.id });
        toast.success(
          `Apply Voucher Successfully!!! Your Order has been discount ${rs.data.discount}%`
        );
        setDiscountPercent(rs.data.discount);
        setOpenPayment(true);
      } else {
        toast.error(`${rs.data.message}`);
      }
    } else {
      setOpenPayment(true);
    }
  };
  useEffect(() => {
    if (discountPercent) {
      setTotal(total - (total * discountPercent) / 100);
    } else {
      setTotal(
        state.list.reduce((price, object) => {
          if (object.discount > 0)
            return price + object.discounted_price * object.quantity;
          else return price + object.price * object.quantity;
        }, 0)
      );
    }
  }, [state]);
  return (
    <div className="bg-dark-800 w-full h-screen text-white rounded-lg p-6 flex flex-col overflow-y-scroll">
      <div className="text-2xl font-semibold flex items-center justify-between">
        <span>Cart Order</span>
        <motion.button
          className="p-3 bg-primary-600 text-center rounded-lg"
          whileTap={{ scale: 1.1 }}
          onClick={() => setCartOpen(false)}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>

      <div
        className={`flex-1 my-5 py-3 ${
          state.list.length > 0
            ? "border-y-[1px] border-[#393C49]"
            : "items-center justify-center flex"
        }`}
      >
        {state.list.length > 0 ? (
          state.list.map((item) => (
            <div
              key={item.id}
              className="list py-2 my-2 overflow-y-scroll no-scrollbar"
            >
              <div className="item flex justify-between gap-2">
                <div className="flex flex-col items-center gap-3 basis-10/12">
                  <div className="flex items-center gap-2 w-full">
                    <img
                      src={item.avatar}
                      className="rounded-full h-11 w-11"
                      alt=""
                    />
                    <div className="flex flex-col flex-1">
                      <span className="text-sm truncate sm:w-40 w-16">
                        {item.name}
                      </span>
                      {item.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#64686a] line-through">
                            {item.price.toLocaleString()}₫
                          </span>
                          <span className="text-sm text-[#ABBBC2]">
                            {item.discounted_price.toLocaleString()}₫
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-[#ABBBC2]">
                          {item.price.toLocaleString()}₫
                        </span>
                      )}
                    </div>
                    {item.quantity <= 1 ? (
                      <></>
                    ) : (
                      <button
                        className="rounded-lg sm:py-4 py-2 sm:px-2 px-1 bg-dark-700"
                        onClick={() =>
                          dispatch({ type: "decreaseItem", sid: item.id })
                        }
                      >
                        -
                      </button>
                    )}
                    <div className="rounded-lg sm:p-4 p-2 bg-dark-700">
                      {item.quantity}
                    </div>
                    <button
                      className="rounded-lg sm:py-4 py-2 sm:px-2 px-1 bg-dark-700"
                      onClick={() => {
                        dispatch({ type: "increaseItem", sid: item.id });
                      }}
                    >
                      +
                    </button>
                  </div>
                  <input
                    type="text"
                    className="bg-dark-700 outline-none p-3 rounded-lg w-full"
                    placeholder="Notice..."
                  />
                </div>
                <div className="flex flex-col items-end justify-between gap-2 basis-2/12">
                  {item.discount > 0 ? (
                    <div className="">
                      {(item.discounted_price * item.quantity).toLocaleString()}
                      ₫
                    </div>
                  ) : (
                    <div className="">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  )}
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="p-3  text-center rounded-lg border-[1px] border-primary-600 hover:bg-primary-600 group transition-all duration-200"
                    onClick={() =>
                      dispatch({ type: "removeItem", sid: item.id })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 group-hover:text-white text-primary-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <img src={cartEmpty} alt="Cart Empty" className="mb-2" />
            Your Cart Is Empty Now.
          </div>
        )}
      </div>

      {state.list.length > 0 ? (
        <div className="footer flex flex-col gap-2">
          <div className=" flex items-center gap-3">
            <span>Coupon</span>
            <input
              type="text"
              className="text-xs outline-none px-4 py-2 rounded-lg bg-dark-700 w-full"
              name=""
              placeholder="Enter Coupon (Not required)"
              onChange={(e) => setCoupon(e.target.value)}
              id=""
            />
          </div>
          {discountPercent && (
            <span className="text-xs">
              Congrats! Your order gets {discountPercent}% off.
            </span>
          )}
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">{total?.toLocaleString()}₫</span>
          </div>
          {!openPayment && (
            <button
              className="p-3 bg-primary-600 text-white rounded-lg"
              onClick={handleContinue}
            >
              Continue Payment
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
