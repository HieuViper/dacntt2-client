import { AsyncStorage } from "AsyncStorage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { call } from "../utils/api";
import moment from "moment/moment";
import { toast } from "react-toastify";
import hidePass from "../assets/hidePass.svg";
import showPass from "../assets/showPass.svg";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { CircularProgress } from "@mui/material";
import Loader from "../components/Loader/Loader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  console.log(
    "🚀 ~ file: ProfilePage.jsx:11 ~ ProfilePage ~ userData:",
    userData
  );
  const [name, setName] = useState();

  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loadingCallAPIUpdate, setLoadingCallAPIUpdate] = useState(false);
  const [loadingCallAPIChangePass, setLoadingCallAPIChangePass] =
    useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoadingCallAPIUpdate(true);
    const rs = await call(`api/customers/${userData.id}`, "PUT", userData);
    if (rs.status == 200) {
      toast.success("Update Successfully!!!", { autoClose: 2000 });
    } else if (rs.status == 400) {
      toast.error(rs.data.message, { autoClose: 2000 });
    } else {
      console.log(rs);
      let entries = Object.entries(rs.data.errors);
      console.log("🚀 ~ file: AddUserPage.jsx:68 ~ .then ~ entries:", entries);
      entries.map(([key, value]) => {
        console.log("loi ne", key, value);

        toast.error(value[0], {
          autoClose: 2000,
        });
      });
    }
    setLoadingCallAPIUpdate(false);
  };

  const handleChangePass = async () => {
    if (!(oldPass && newPass && confirmPass)) {
      toast.error("Please fill all field !");
    } else {
      setLoadingCallAPIChangePass(true);
      const rs = await call(`api/password`, "PUT", {
        current_password: oldPass,
        password: newPass,
        password_confirmation: confirmPass,
      });
      if (rs.status == 200) {
        toast.success("Change Password Successfully!!!", { autoClose: 2000 });
        document.getElementById("old_password").value = "";
        document.getElementById("new_password").value = "";
        document.getElementById("confirm_password").value = "";
        setOldPass(null);
        setNewPass(null);
        setConfirmPass(null);
      } else {
        console.log(rs);
        let entries = Object.entries(rs.data.message);
        console.log(
          "🚀 ~ file: AddUserPage.jsx:68 ~ .then ~ entries:",
          entries
        );
        entries.map(([key, value]) => {
          console.log("loi ne", key, value);

          toast.error(value[0], {
            autoClose: 2000,
          });
        });
      }
      setLoadingCallAPIChangePass(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token-customer");
      console.log("🚀 ~ file: LoginPage.jsx:56 ~ useEffect ~ token:", token);
      if (!token) {
        navigate("/login");
      } else {
        const rs = await call(`api/user`);

        setUserData(rs);
        setName(rs.name);
      }
    };
    checkToken();
  }, []);

  return userData ? (
    <div className="flex gap-7">
      <div className="basis-8/12  bg-dark-800 text-white p-6 rounded-xl shadow-lg">
        <div className="flex gap-7 items-center">
          <img
            src={userData.avatar}
            className="shadow-md rounded-full h-20 w-20"
            alt=""
          />
          <div className="flex flex-col gap-3">
            <div className="font-semibold">{name}</div>
            <div className="">
              Member since{" "}
              <span className="italic">
                {new Date(userData.created_at).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-4 mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="p-4 mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="p-4 mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className="p-4 mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center mt-5">
          <button
            className={`px-6 py-2 w-fit bg-primary-600 rounded-xl shadow-md hover:opacity-75 duration-200 ${
              loadingCallAPIUpdate ? "opacity-75 select-none" : ""
            }`}
            onClick={handleUpdate}
          >
            {loadingCallAPIUpdate ? (
              <CircularProgress size="1.25rem" sx={{ color: "white" }} />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
      <div className="basis-4/12 bg-dark-800 text-white p-6 rounded-xl shadow-lg">
        <div className="font-semibold text-2xl h-20">Change Password</div>

        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col">
            <label htmlFor="old_password">Current Password</label>
            <div className="relative">
              <input
                className="p-4 w-full mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
                type={showOldPass ? "text" : "password"}
                name=""
                id="old_password"
                onChange={(e) => setOldPass(e.target.value)}
              />
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"
                onClick={() => setShowOldPass(!showOldPass)}
              >
                {showOldPass ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="new_password">New Password</label>
            <div className="relative">
              <input
                className="p-4 w-full mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
                type={showNewPass ? "text" : "password"}
                name=""
                id="new_password"
                onChange={(e) => setNewPass(e.target.value)}
              />
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"
                onClick={() => setShowNewPass(!showNewPass)}
              >
                {showNewPass ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirm_password">Confirm Password</label>
            <div className="relative">
              <input
                className="p-4 w-full mt-2 bg-[#2D303E] text-[#E0E6E9] rounded-xl shadow-md outline-none"
                type={showConfirmPass ? "text" : "password"}
                name=""
                id="confirm_password"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center mt-5">
          <button
            className={`px-6 py-2 w-fit bg-primary-600 rounded-xl shadow-md hover:opacity-75 duration-200 ${
              loadingCallAPIChangePass ? "opacity-75 select-none" : ""
            }`}
            onClick={handleChangePass}
          >
            {loadingCallAPIChangePass ? (
              <CircularProgress size="1.25rem" sx={{ color: "white" }} />
            ) : (
              "Change"
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full">
      <Loader />
    </div>
  );
};

export default ProfilePage;
