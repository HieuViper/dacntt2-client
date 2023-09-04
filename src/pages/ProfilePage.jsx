/* eslint-disable react/prop-types */
import { AsyncStorage } from "AsyncStorage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { call, callUpload } from "../utils/api";
import moment from "moment/moment";
import { toast } from "react-toastify";
import hidePass from "../assets/hidePass.svg";
import showPass from "../assets/showPass.svg";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  tableRowClasses,
} from "@mui/material";
import Loader from "../components/Loader/Loader";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiFillCamera } from "react-icons/ai";
import styled from "@emotion/styled";

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

  //avatar
  const [previewPic, setPreviewPic] = useState();
  const [uploadPic, setUploadPic] = useState();
  const changeUploadPicHandler = (e) => {
    setPreviewPic(URL.createObjectURL(e.target.files[0]));
    setUploadPic(e.target.files[0]);
  };

  // order tabble
  const [orders, setOrders] = useState();
  const [orderItem, setOrderItem] = useState([]);
  console.log(
    "🚀 ~ file: ProfilePage.jsx:50 ~ ProfilePage ~ orderItem:",
    orderItem
  );
  console.log("🚀 ~ file: ProfilePage.jsx:49 ~ ProfilePage ~ orders:", orders);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoadingCallAPIUpdate(true);

    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);
    formData.append("avatar", uploadPic || userData.avatar);
    formData.append("_method", "PUT");

    const rs = await callUpload(
      `api/customers/${userData.id}`,
      "POST",
      formData
    );
    if (rs.status == 200) {
      toast.success("Update Successfully!!!", { autoClose: 2000 });
    } else if (rs.status == 400) {
      toast.error(rs.data.message, { autoClose: 2000 });
    } else {
      console.log(rs);
      let entries = Object.entries(rs.data.errors);
      console.log(
        "🚀 ~ file: ProfilePage.jsx:91 ~ handleUpdate ~ entries:",
        entries
      );
      entries.map(([key, value]) => {
        console.log("loi ne", key, value);

        toast.error(value[0], {
          autoClose: 2000,
        });
      });
    }
    setLoadingCallAPIUpdate(false);

    setUploadPic(null);
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
        call(`api/orders?customer_id=${rs.id}`).then(async (rs) => {
          setOrders(rs.data);
          console.log("🚀 ~ file: ProfilePage.jsx:133 ~ call ~ rs:", rs);
          await rs.data.map((rs1) => {
            console.log(rs1);
            call(`api/orders/${rs1.id}`).then((rs2) => {
              setOrderItem((current) => [
                ...current,
                {
                  id: rs1.id,
                  detail: rs2.data.detail,
                },
              ]);
            });
          });
        });
        setUserData(rs);
        setName(rs.name);
      }
    };
    checkToken();
  }, []);

  const StyledCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1F1D2B",
      fontSize: 14,
      fontWeight: 600,
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: "#1F1D2B",
      fontSize: 14,
      border: "none",
      color: "white",
    },
  }));

  const StyledRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
      borderColor: "#ccc",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    console.log(expandComponent);
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <>
        <StyledRow {...otherProps}>
          <StyledCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <IoIosArrowUp style={{ color: "white" }} />
              ) : (
                <IoIosArrowDown style={{ color: "white" }} />
              )}
            </IconButton>
          </StyledCell>
          {children}
        </StyledRow>
        {isExpanded && (
          <StyledRow>
            <StyledCell padding="checkbox" />
            <StyledCell colSpan={6}>{expandComponent}</StyledCell>
          </StyledRow>
        )}
      </>
    );
  };

  const ExpandRowComponent = ({ row_id, orderItem }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    const [value, setValue] = React.useState(0);
    const [openRating, setOpenRating] = useState(false);
    const [ratingItem, setRatingItem] = useState();
    console.log(
      "🚀 ~ file: ProfilePage.jsx:218 ~ ExpandRowComponent ~ ratingItem:",
      ratingItem
    );
    const [loadingRating, setLoadingRating] = useState(false);

    const handleRating = () => {
      if (value > 0) {
        setLoadingRating(true);
        call(`api/ratings`, "POST", {
          customer_id: userData.id,
          food_id: ratingItem.food_id,
          rating: value,
        }).then((rs) => {
          console.log(rs);

          if (rs) {
            if (rs.status == 200) {
              toast.success("Rating Successfully!!!");
            }
          }
          setLoadingRating(false);
          setOpenRating(false);
        });
      } else {
        toast.error("Please select rating!");
      }
    };
    return (
      <>
        {orderItem.map(
          (item) =>
            item.id == row_id &&
            item.detail.map((rs) => (
              <TableRow key={rs.id} sx={{ width: "100%" }}>
                <StyledCell>
                  <img
                    src={rs.food.avatar}
                    className="w-16 h-16 rounded-lg"
                    alt=""
                  />
                </StyledCell>
                <StyledCell>{rs.food.name}</StyledCell>
                <StyledCell>Quantity: {rs.quantity}</StyledCell>
                <StyledCell>Price: {rs.unit_price.toLocaleString()}</StyledCell>
                <StyledCell colSpan={4}>
                  <button
                    onClick={() => {
                      setOpenRating(true);
                      setRatingItem(rs);
                    }}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:opacity-70 duration-200"
                  >
                    Rating
                  </button>
                </StyledCell>
              </TableRow>
            ))
        )}

        <Modal
          open={openRating}
          onClose={() => setOpenRating(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src={ratingItem?.food?.avatar}
                className="w-32 h-32"
                alt=""
              />

              <Typography id="modal-modal-title" variant="h6" component="h2">
                {ratingItem?.food?.name}
              </Typography>

              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />

              <button
                onClick={handleRating}
                className="p-3 rounded-lg bg-primary-600 text-white hover:opacity-75 duration-200"
              >
                {loadingRating ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  <>Rate this</>
                )}
              </button>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Thanks for your contribution!!!
              </Typography>
            </div>
          </Box>
        </Modal>
      </>
    );
  };

  return userData ? (
    <>
      <div className="flex gap-7">
        <div className="basis-8/12  bg-dark-800 text-white p-6 rounded-xl shadow-lg">
          <div className="flex gap-7 items-center">
            <div className="relative">
              <img
                src={previewPic || userData.avatar}
                className="shadow-md rounded-full h-20 w-20"
                alt=""
              />
              <button className="absolute rounded-full h-20 w-20 bottom-0 left-0 right-0 top-0 overflow-hidden bg-gray-600 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50">
                <label
                  htmlFor="dropzone-file"
                  className="w-full h-full flex justify-center items-center cursor-pointer"
                >
                  <AiFillCamera size="2rem" />
                </label>
              </button>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeUploadPicHandler}
              />
            </div>
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

      {/* table */}
      <div className="mt-10 pb-10">
        <Table sx={{ minWidth: 650, color: "white" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledCell padding="checkbox" />
              <StyledCell>Order ID</StyledCell>
              <StyledCell align="right">Recipent</StyledCell>
              <StyledCell align="right">Address</StyledCell>
              <StyledCell align="right">Phone</StyledCell>
              <StyledCell align="right">Total Payment</StyledCell>
              <StyledCell align="right">Status</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((row) => (
                <ExpandableTableRow
                  key={row.name}
                  expandComponent={
                    orderItem.length > 0 && (
                      <ExpandRowComponent
                        row_id={row.id}
                        orderItem={orderItem}
                      />
                    )
                  }
                >
                  <StyledCell component="th" scope="row">
                    #{row.id}
                  </StyledCell>
                  <StyledCell align="right">{row.name}</StyledCell>
                  <StyledCell align="right">{row.address}</StyledCell>
                  <StyledCell align="right">{row.phone}</StyledCell>
                  <StyledCell align="right">
                    {parseFloat(row.total).toLocaleString()}
                  </StyledCell>
                  <StyledCell align="right" className="">
                    <div className="w-full flex justify-end">
                      <div
                        className={`${
                          row.lastest_order_progress ==
                          "Order was placed successfully."
                            ? "bg-[#EB966A]/[.24] text-[#FFB572]"
                            : row.lastest_order_progress ==
                              "Order was paid successfully."
                            ? "bg-[#6BE2BE]/[.24] text-[#50D1AA]"
                            : "bg-red-600/[.24] text-red-500"
                        }  w-fit rounded-2xl p-2`}
                      >
                        {row.lastest_order_progress}
                      </div>
                    </div>
                  </StyledCell>
                </ExpandableTableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  ) : (
    <div className="w-full h-full">
      <Loader />
    </div>
  );
};

export default ProfilePage;
