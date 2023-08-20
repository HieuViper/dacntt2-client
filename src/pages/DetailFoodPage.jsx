import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { callNon } from "../utils/api";
import CardItem from "../components/Card/CardItem";
import { useContext } from "react";
import { CartContext } from "../stores/CartContext";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
import { FoodContext } from "../stores/FoodContext";

const CustomPagination = styled(Pagination)({
  "& .Mui-selected": {
    backgroundColor: "#ea736d",
    color: "#ffffff",
  },
  "& .MuiPaginationItem-root": {
    color: "#ffffff",
  },
});

const DetailFoodPage = () => {
  const location = useLocation();
  const [total, setTotal] = useState(1);
  const [toogleSidebar] = useOutletContext();
  const { state: stateCart, dispatch: dispatchCart } = useContext(CartContext);
  console.log(
    "🚀 ~ file: DetailFoodPage.jsx:28 ~ DetailFoodPage ~ stateCart:",
    stateCart
  );

  const [foodData, setFoodData] = useState();
  console.log(
    "🚀 ~ file: DetailFoodPage.jsx:30 ~ DetailFoodPage ~ foodData:",
    foodData
  );

  const [foodStoreData, setFoodStoreData] = useState();

  const handleChangePage = (event, value) => {
    console.log(value);
    callNon(`api/food?page=${value}&page_size=10`).then((res) => {
      setFoodStoreData(res.data);
    });
  };

  useEffect(() => {
    async function fetchData() {
      const rs1 = await callNon(`api/food/${location.state.food_id}`);
      setFoodData(rs1.data);
      const rs2 = await callNon(`api/food?store_id=${location.state.store_id}`);
      setFoodStoreData(rs2.data);
      setTotal(rs2.paging.last_page);
    }
    fetchData();
  }, []);
  return (
    <div className="h-full w-full">
      {foodData && (
        <div className="section-detail sm:w-[80%] w-full sm:flex sm:flex-row flex-col items-center gap-10">
          <img
            src={foodData.avatar}
            className="sm:w-[300px] w-[150px] rounded-xl shadow-md sm:mx-0 mx-auto mb-5 sm:mb-0"
            alt=""
          />
          <div className="flex flex-col gap-5">
            <div className="font-semibold text-2xl">{foodData.name}</div>
            <div className="">
              Available at <b>{foodData.food_group?.store?.name}</b>
            </div>
            <div className="italic text-sm">
              Address Store: {foodData.food_group?.store?.address}
            </div>
            <div className="">
              Food Group: <b>{foodData.food_group?.name}</b>
            </div>
            <div className="text-[#ccc]">{foodData.description}</div>
            <div className="flex items-center gap-4">
              {foodData.discount > 0 ? (
                <>
                  <div className="line-through text-xs text-[#ccc]">
                    {foodData.price.toLocaleString()}₫
                  </div>
                  <div className="text-primary-500 text-xl font-semibold">
                    {foodData.discounted_price.toLocaleString()} ₫
                  </div>
                </>
              ) : (
                <div className="text-primary-500 text-xl font-semibold">
                  {foodData.price.toLocaleString()}₫
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="section-store-food sm:mt-0 mt-8">
        <div
          className={` pt-6 grid  ${
            toogleSidebar
              ? "lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 place-items-center"
              : "grid-cols-4"
          } 
        } `}
        >
          {foodStoreData &&
            foodStoreData.length > 0 &&
            foodStoreData.map((item) => (
              <CardItem
                key={item.id}
                data={item}
                dispatch={dispatchCart}
                storeID={location.state.store_id}
                state={stateCart}
                isMenu={location.state}
              />
            ))}
        </div>
      </div>

      {foodStoreData && (
        <div className="pb-5 flex justify-end px-4">
          <CustomPagination
            count={total}
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default DetailFoodPage;
