import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Cart from "../components/Cart/Cart";
import { Drawer, SwipeableDrawer } from "@mui/material";
import { CartContext, CartProvider } from "../stores/CartContext";
import Payment from "../components/Payment/Payment";

// eslint-disable-next-line react/prop-types
const DeafaultLayout = () => {
  const { state, dispatch } = useContext(CartContext);
  const [toogleSidebar, setToogleSidebar] = useState(true);
  console.log(
    "🚀 ~ file: DeafaultLayout.jsx:12 ~ DeafaultLayout ~ state:",
    state
  );
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="w-full h-screen bg-dark-700 object-cover flex items-center gap-5 text-white overflow-y-scroll">
      <div className="fixed top-0 w-full z-50 p-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-r from-primary-600 to-slate-900">
        <Header setCartOpen={setCartOpen} />
      </div>
      <div className="flex h-full w-full pt-5 mt-48 gap-7">
        <Drawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          anchor="right"
          PaperProps={{
            style: {
              maxWidth: "70%",
              backgroundColor: "transparent",
            },
          }}
        >
          <CartProvider>
            <div className="flex h-full">
              <Cart
                setCartOpen={setCartOpen}
                state={state}
                dispatch={dispatch}
              />
              <div className="h-full w-[1px] bg-[#393C49]"></div>
              <Payment />
            </div>
          </CartProvider>
        </Drawer>
        <div className="">
          <SideBar setToogleSidebar={setToogleSidebar} />
        </div>
        <div className="flex-1 relative">
          <Outlet setCartOpen={setCartOpen} context={[toogleSidebar]} />
        </div>
      </div>
    </div>
  );
};

export default DeafaultLayout;
