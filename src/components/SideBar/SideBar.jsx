import React, { useContext, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import SideBarData, { CustomTooltip } from "./SideBarData";
import { authContext } from "../../utils/auth";

// eslint-disable-next-line react/prop-types
const SideBar = ({ setToogleSidebar }) => {
  const [toggle, setToggle] = useState(true);
  const userInfo = useContext(authContext);
  return (
    <div
      className={`${toggle ? "sm:w-fit w-0" : "w-[18rem]"} sidebar-container`}
    >
      {/* <UserProfile toggle={toggle} /> */}
      <SideBarData toggle={toggle} />
      <div className="mt-10 mb-2">
        {userInfo && (
          <CustomTooltip title={toggle ? "Logout" : ""} arrow placement="right">
            <div className={`${toggle ? "w-[3.6rem]" : "w-[16rem]"} sidebar`}>
              <div className="mr-8 text-[1.7rem] text-[rgb(30, 30, 17)]">
                <FiLogOut />
              </div>
              <div
                className={`${
                  toggle ? "opacity-0 delay-200 transition-all" : ""
                } text-[1rem] text-[rgb(30, 30, 17)] whitespace-pre`}
              >
                Logout
              </div>
            </div>
            {/* <div
            className={` bottom-4 left-4 z-10 cursor-pointer  sidebar ${
              toggle ? "w-[62%]" : "w-[87%]"
            }`}
            // onClick={handleLogout}
          >
            <div className="mr-8 text-[1.7rem] text-[rgb(30, 30, 17)]">
              <FiLogOut />
            </div>
            <div
              className={`${
                toggle ? "opacity-0 delay-200" : ""
              } text-[1rem] text-[rgb(30, 30, 17)] whitespace-pre`}
            >
              Logout
            </div>
          </div> */}
          </CustomTooltip>
        )}
      </div>
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
