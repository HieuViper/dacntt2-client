/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { RiShoppingBasketFill } from "react-icons/ri";
import { CartContext } from "../../stores/CartContext";
import { useNavigate } from "react-router-dom";

const CardItem = ({ data, dispatch, state, isMenu }) => {
  const navigate = useNavigate();
  // console.log("🚀 ~ file: CardItem.jsx:8 ~ CardItem ~ state:", state);
  // const { state, dispatch } = useContext(CartContext);
  return (
    <div>
      {data && (
        <div
          // key={item?.id}
          className="min-w-[192px] w-[250px] h-[320px]  backdrop-blur-xl mt-10 mb-4  border-none rounded-lg p-3 cursor-pointer flex flex-col items-center justify-center bg-dark-800 text-white"
        >
          <div className="w-full flex items-center justify-center ">
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={data.avatar}
              alt={data.name}
              className="w-32 h-[140px] -mt-14 rounded-full"
            />
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center px-4 text-center flex-1">
            <p className="text-white font-semibold truncate w-full text-lg">
              {data.name}
            </p>
            <p className="mt-1 text-sm">123456 Calories</p>
            <div className="flex items-center gap-8">
              <p className="text-lg text-white font-semibold">
                <span className="text-sm text-white"></span>{" "}
                {data.price.toLocaleString()}₫
              </p>
            </div>
          </div>
          {/* Button */}
          {isMenu ? (
            <div className="w-full">
              {state.list.find((x) => x.id == data.id) ? (
                <motion.button
                  className="py-3 bg-transparent border border-red-500 text-red-500 w-full rounded-xl hover:text-white hover:bg-red-500 duration-200"
                  whileTap={{ scale: 1.1 }}
                  onClick={() => {
                    dispatch({ type: "removeItem", sid: data.id });
                  }}
                >
                  Remove Selected Item
                </motion.button>
              ) : (
                <motion.button
                  className="py-3 bg-primary-600 text-white w-full rounded-xl"
                  whileTap={{ scale: 1.1 }}
                  onClick={() => {
                    dispatch({
                      type: "addItem",
                      item: { ...data, quantity: 1 },
                    });
                  }}
                >
                  Order Now
                </motion.button>
              )}
            </div>
          ) : (
            <motion.button
              className="py-3 bg-primary-600 text-white w-full rounded-xl"
              whileTap={{ scale: 1.1 }}
              onClick={() => {
                navigate(`/food/${data.id}`, {
                  state: {
                    food_id: data.id,
                    store_id: data.food_group.store_id,
                  },
                });
              }}
            >
              See More
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardItem;
