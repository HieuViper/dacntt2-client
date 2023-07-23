import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { call, callNon } from "../utils/api";
import { useLocation } from "react-router-dom";

const initialState = {
  list: [],
};
const removeFood = (sid, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((item) => item.id === sid);
  temp.splice(index, 1);
  return { ...state, list: temp };
};
const addFood = (item, state) => {
  const temp = [...state.list];
  temp.unshift(item);
  return { ...state, list: temp };
};
const updateFood = (item, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((obj) => obj.id === item.id);
  temp[index] = item;
  return { ...state, list: temp };
};
const filterFoodGroup = async (item, state) => {
  console.log(item);
  let temp = [...state.list];
  console.log("🚀 ~ file: FoodContext.jsx:29 ~ filterFoodGroup ~ temp:", temp);
  const rs = await callNon(
    `api/stores/${item.store_id}/food_groups/${item.id}/food?page_size=100&page=1`
  );
  console.log("🚀 ~ file: FoodContext.jsx:32 ~ filterFoodGroup ~ rs:", rs);
  temp = rs.data;
  console.log(temp);
  return state;

  // console.log(temp);
};

const getFood = (item, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((obj) => obj.id === item.id);
  return index;
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setList":
      return { ...state, list: action.payload.list };
    case "getTotal":
      return { ...state, total: action.payload.total };
    case "getFood":
      return getFood(action.item, state);
    case "removeFood":
      return removeFood(action.sid, state);
    case "addFood":
      return addFood(action.item, state);
    case "updateFood":
      return updateFood(action.item, state);
    case "filterFoodGroup":
      return filterFoodGroup(action.item, state);

    default:
      return { ...state };
  }
};
const FoodContext = React.createContext(initialState);
function FoodProvider({ children }) {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      getListFoodFromStore(location.state.selectStore);
    } else {
      getListFood();
    }
  }, [location.state]);

  async function getListFood() {
    const result = await callNon("api/food", "GET", {});
    console.log(
      "🚀 ~ file: ListUserContext.jsx:59 ~ getListUser ~ result:",
      result
    );

    dispatch({ type: "setList", payload: { list: result.data } });
    dispatch({ type: "getTotal", payload: { total: result.total } });
    setIsLoading(false);
  }
  async function getListFoodFromStore(data) {
    dispatch({ type: "setList", payload: { list: data } });
    setIsLoading(false);
  }
  return (
    <FoodContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </FoodContext.Provider>
  );
}
FoodProvider.propTypes = {
  children: PropTypes.any,
};
export { FoodContext, FoodProvider };
