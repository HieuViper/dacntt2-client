import React, { useContext } from "react";
import { datas } from "./Data";
import { FiLogOut } from "react-icons/fi";
import { AsyncStorage } from "AsyncStorage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";
import { authContext } from "../../utils/auth";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "fff",
    "&::before": {
      backgroundColor: "#EA736D",
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EA736D",
    color: "fff",
    fontFamily: "Poppins",
  },
}));
// eslint-disable-next-line react/prop-types
const SideBarData = ({ toggle }) => {
  const location = useLocation();
  const userInfo = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    AsyncStorage.setItem("token-customer", "");
    navigate("/login");
  };
  return (
    <div className="">
      {datas.map((data) => {
        return (
          <div
            className={`${toggle ? "sm:block hidden" : "block"}`}
            key={data.id}
          >
            <Link to={data.href}>
              <CustomTooltip
                title={toggle ? data.text : ""}
                arrow
                placement="right"
              >
                <div
                  className={`${
                    toggle ? "last:w-[3.6rem]" : "last:w-[16rem]"
                  } sidebar `}
                  key={data.id}
                >
                  <div className="mr-8 text-[1.7rem] text-[rgb(30, 30, 17)]">
                    {data.icon}
                  </div>
                  <div
                    className={`${
                      toggle ? "opacity-0 delay-200 transition-all" : ""
                    } text-[1rem] text-[rgb(30, 30, 17)] whitespace-pre`}
                  >
                    {data.text}
                  </div>
                </div>
              </CustomTooltip>
            </Link>

            {userInfo && (
              <CustomTooltip
                title={toggle ? "Logout" : ""}
                arrow
                placement="right"
              >
                <div
                  className={`absolute bottom-4 left-4 z-10 cursor-pointer  sidebar ${
                    toggle ? "w-[62%]" : "w-[87%]"
                  }`}
                  onClick={handleLogout}
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
                </div>
              </CustomTooltip>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideBarData;
