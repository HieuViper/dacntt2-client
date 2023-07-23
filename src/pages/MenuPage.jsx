/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import TabComponent from "../components/Tab/Tab";
import { call, callNon } from "../utils/api";
import { CartContext } from "../stores/CartContext";
import { FoodContext } from "../stores/FoodContext";
import { useLocation, useOutletContext } from "react-router-dom";

const MenuPage = () => {
  const [toogleSidebar] = useOutletContext();
  const location = useLocation();
  console.log("🚀 ~ file: MenuPage.jsx:13 ~ MenuPage ~ location:", location);
  const { state: stateCart, dispatch: dispatchCart } = useContext(CartContext);
  console.log("🚀 ~ file: MenuPage.jsx:9 ~ MenuPage ~ stateCart:", stateCart);
  const { state: stateFood, dispatch: dispatchFood } = useContext(FoodContext);
  console.log("🚀 ~ file: MenuPage.jsx:11 ~ MenuPage ~ stateFood:", stateFood);

  const [foodGroupData, setFoodGroupData] = useState();

  useEffect(() => {
    const food_group = callNon(`api/food-groups`);

    food_group.then((res) => {
      console.log("🚀 ~ file: MenuPage.jsx:19 ~ useEffect ~ res:", res);
      setFoodGroupData(res.data);
    });
  }, []);

  return (
    <div className="pt-3 flex flex-col ">
      <div className="tab">
        {foodGroupData && (
          <TabComponent data={foodGroupData} dispatch={dispatchFood} />
        )}
      </div>
      <div
        className={` pt-6 grid  ${
          toogleSidebar ? "grid-cols-5" : "grid-cols-4"
        } 
        } `}
      >
        {stateFood.list &&
          stateFood.list.map((item) => (
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
  );
};

export default MenuPage;
