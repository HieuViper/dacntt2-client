import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { call } from "../utils/api";

const initialState = {
  list: [],
};
const removeItem = (sid, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((item) => item.id === sid);
  temp.splice(index, 1);
  return { ...state, list: temp };
};
const addItem = (item, state) => {
  const temp = [...state.list];
  temp.unshift(item);
  return { ...state, list: temp };
};
const addStoreID = (item, state) => {
  return { ...state, storeID: item };
};
const addVoucherID = (item, state) => {
  return { ...state, voucherID: item };
};
const clearCart = (state) => {
  const temp = [];
  return { ...state, list: temp };
};
const updateItem = (item, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((obj) => obj.id === item.id);
  temp[index] = item;
  return { ...state, list: temp };
};
const increaseItem = (sid, state) => {
  console.log("vao day");
  const temp = [...state.list];
  const index = temp.findIndex((item) => item.id === sid);
  temp[index].quantity += 1;
  console.log(temp[index].quantity);
  return { ...state, list: temp };
};
const decreaseItem = (sid, state) => {
  const temp = [...state.list];
  const index = temp.findIndex((item) => item.id === sid);
  temp[index].quantity -= 1;
  console.log(temp);
  // if (temp[index].quantity < 1) {
  //   temp[index].quantity = 1;
  // }
  return { ...state, list: temp };
};
const getItem = (item, state) => {
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
    case "getItem":
      return getItem(action.item, state);
    case "removeItem":
      return removeItem(action.sid, state);
    case "addItem":
      return addItem(action.item, state);
    case "updateItem":
      return updateItem(action.item, state);
    case "increaseItem":
      return increaseItem(action.sid, state);
    case "decreaseItem":
      return decreaseItem(action.sid, state);
    case "addStoreID":
      return addStoreID(action.item, state);
    case "addVoucherID":
      return addVoucherID(action.item, state);
    case "clearCart":
      return clearCart(state);
    default:
      return { ...state };
  }
};
const CartContext = React.createContext(initialState);
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
CartProvider.propTypes = {
  children: PropTypes.any,
};
export { CartContext, CartProvider };
