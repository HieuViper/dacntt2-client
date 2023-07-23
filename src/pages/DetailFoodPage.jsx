import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { callNon } from "../utils/api";
import CardItem from "../components/Card/CardItem";
import { useContext } from "react";
import { CartContext } from "../stores/CartContext";

const DetailFoodPage = () => {
  const location = useLocation();
  const [toogleSidebar] = useOutletContext();
  const { state: stateCart, dispatch: dispatchCart } = useContext(CartContext);
  console.log(
    "🚀 ~ file: DetailFoodPage.jsx:9 ~ DetailFoodPage ~ location:",
    location
  );
  const [foodData, setFoodData] = useState();
  console.log(
    "🚀 ~ file: DetailFoodPage.jsx:14 ~ DetailFoodPage ~ foodData:",
    foodData
  );
  const [foodStoreData, setFoodStoreData] = useState();
  console.log(
    "🚀 ~ file: DetailFoodPage.jsx:16 ~ DetailFoodPage ~ foodStoreData:",
    foodStoreData
  );

  useEffect(() => {
    async function fetchData() {
      const rs1 = await callNon(`api/food/${location.state.food_id}`);
      setFoodData(rs1.data);
      const rs2 = await callNon(`api/food?store_id=${location.state.store_id}`);
      setFoodStoreData(rs2.data);
    }
    fetchData();
  }, []);
  return (
    <div className="h-full w-full">
      {foodData && (
        <div className="section-detail flex items-center gap-10">
          <img src={foodData.avatar} className="w-[300px] h-[250px]" alt="" />
          <div className="flex flex-col">
            <div className="">{foodData.name}</div>
            <div className="">{foodData.food_group?.store?.name}</div>
            <div className="">{foodData.food_group?.store?.address}</div>
            <div className="">{foodData.price.toLocaleString()}VND</div>
          </div>
        </div>
      )}
      <div className="section-store-food ">
        <div
          className={` pt-6 grid  ${
            toogleSidebar ? "grid-cols-5" : "grid-cols-4"
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
                state={stateCart}
                isMenu={location.state}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailFoodPage;
