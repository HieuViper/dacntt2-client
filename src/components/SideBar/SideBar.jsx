import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import SideBarData from "./SideBarData";

// eslint-disable-next-line react/prop-types
const SideBar = ({ setToogleSidebar }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <div
      className={`${toggle ? "sm:w-fit w-0" : "w-[18rem]"} sidebar-container`}
    >
      {/* <UserProfile toggle={toggle} /> */}
      <SideBarData toggle={toggle} />
      <div
        className="absolute top-[7rem] flex justify-center items-center -left-4 w-8 h-8 bg-[rgba(255,255,255,0.25)] rounded-full cursor-pointer"
        onClick={() => {
          setToggle(!toggle);
          setToogleSidebar(!toggle);
        }}
      >
        <BiChevronLeft
          className={`${
            toggle ? "rotate-180" : ""
          } text-3xl transition-all duration-300`}
        />
      </div>
    </div>
  );
};

export default SideBar;
