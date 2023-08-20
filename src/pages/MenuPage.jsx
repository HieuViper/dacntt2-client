/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import TabComponent from "../components/Tab/Tab";
import { call, callNon } from "../utils/api";
import { CartContext } from "../stores/CartContext";
import { FoodContext } from "../stores/FoodContext";
import { useLocation, useOutletContext } from "react-router-dom";
import { authContext } from "../utils/auth";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";

const CustomPagination = styled(Pagination)({
  "& .Mui-selected": {
    background: "#ea736d",
    color: "#ffffff",
  },
  "& .MuiPaginationItem-root": {
    color: "#ffffff",
  },
});

const MenuPage = () => {
  const [toogleSidebar] = useOutletContext();
  const location = useLocation();
  const [selectedFoodGroup, setSelectedFoodGroup] = useState();
  console.log("🚀 ~ file: MenuPage.jsx:13 ~ MenuPage ~ location:", location);
  const { state: stateCart, dispatch: dispatchCart } = useContext(CartContext);
  console.log("🚀 ~ file: MenuPage.jsx:9 ~ MenuPage ~ stateCart:", stateCart);
  const { state: stateFood, dispatch: dispatchFood } = useContext(FoodContext);
  console.log("🚀 ~ file: MenuPage.jsx:11 ~ MenuPage ~ stateFood:", stateFood);

  // const userInfo = useContext(authContext);
  // console.log("🚀 ~ file: MenuPage.jsx:21 ~ MenuPage ~ userInfo:", userInfo);

  const [foodGroupData, setFoodGroupData] = useState();

  const handleChangePage = (event, value) => {
    console.log(value);
    console.log(selectedFoodGroup);

    if (location.state?.storeID) {
      callNon(
        `api/food?store_id=${
          location.state.storeID
        }&page=${value}&page_size=10&q=${location.state?.searchQuery || ""}`
      ).then((res) => {
        dispatchFood({ type: "setList", payload: { list: res.data } });
        dispatchFood({
          type: "getTotal",
          payload: { total: res.paging.last_page },
        });
      });
    } else {
      if (selectedFoodGroup) {
        callNon(
          `api/stores/${selectedFoodGroup.store_id}/food_groups/${
            selectedFoodGroup.id
          }/food?page=${value}&page_size=10&q=${
            location.state?.searchQuery || ""
          }`
        ).then((res) => {
          dispatchFood({ type: "setList", payload: { list: res.data } });
          dispatchFood({
            type: "getTotal",
            payload: { total: res.paging.last_page },
          });
        });
      } else {
        callNon(
          `api/food?page=${value}&page_size=10&q=${
            location.state?.searchQuery || ""
          }`
        ).then((res) => {
          dispatchFood({ type: "setList", payload: { list: res.data } });
          dispatchFood({
            type: "getTotal",
            payload: { total: res.paging.last_page },
          });
        });
      }
    }
  };

  useEffect(() => {
    if (location.state?.storeID) {
      const food_group = callNon(
        `api/stores/${location.state.storeID}/food_groups?page_size=1000`
      );

      food_group.then((res) => {
        console.log("🚀 ~ file: MenuPage.jsx:19 ~ useEffect ~ res:", res);
        setFoodGroupData(res.data);
      });
    } else {
      const food_group = callNon(`api/food-groups?page_size=1000`);

      food_group.then((res) => {
        console.log("🚀 ~ file: MenuPage.jsx:19 ~ useEffect ~ res:", res);
        setFoodGroupData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (location.state?.searchQuery) {
      callNon(`api/food?q=${location.state?.searchQuery}`).then((res) => {
        dispatchFood({ type: "setList", payload: { list: res.data } });
        dispatchFood({
          type: "getTotal",
          payload: { total: res.paging.last_page },
        });
      });
    }
  }, [location.state?.searchQuery]);

  return (
    <div className="pt-3 flex flex-col ">
      <div className="tab">
        {foodGroupData && (
          <TabComponent
            data={foodGroupData}
            dispatch={dispatchFood}
            setSelectedFoodGroup={setSelectedFoodGroup}
          />
        )}
      </div>

      {location?.state?.searchQuery && (
        <div className="font-semibold text-2xl pl-8 my-3">
          Search for : <i>"{location?.state?.searchQuery}"</i>
        </div>
      )}

      <div
        className={` pt-6 grid  ${
          toogleSidebar
            ? "lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 place-items-center"
            : "lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 place-items-center"
        } 
        } `}
      >
        {stateFood.list && stateFood.list.length > 0 ? (
          stateFood.list.map((item) => (
            <CardItem
              key={item.id}
              data={item}
              dispatch={dispatchCart}
              state={stateCart}
              isMenu={location.state?.storeID}
              storeID={location.state?.storeID}
            />
          ))
        ) : (
          <>No Food Found</>
        )}
      </div>

      {stateFood.list && stateFood.list.length > 0 && (
        <div className="pb-5 flex justify-end px-4">
          <CustomPagination
            count={stateFood.total}
            shape="rounded"
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default MenuPage;
