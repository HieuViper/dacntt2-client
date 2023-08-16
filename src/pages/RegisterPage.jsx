import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  outlinedInputClasses,
  styled,
  withStyles,
} from "@mui/material";
import { useFormik } from "formik";
import RegisterValidationSchema from "../validations/RegisterValidation";
import { callNon } from "../utils/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AsyncStorage } from "AsyncStorage";

const RegisterPage = () => {
  const [togglePassword, setTooglePassword] = useState(false);
  const [toggleConfirmPw, setToogleConfirmPw] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      callNon(`api/register`, "POST", values).then((res) => {
        if (res) setLoading(false);
        if (res.status == 200) {
          toast.success("Resgister Successfully", { autoClose: 2000 });
          navigate("/login");
        } else {
          if (res.data.errors) {
            for (var key in res.data.errors) {
              var value = res.data.errors[key][0];
              console.log(value);
              toast.error(value, { autoClose: 2000 });
            }
          } else {
            toast.error(res.data.message, { autoClose: 2000 });
          }
        }
      });
    },
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token-customer");
      console.log("🚀 ~ file: LoginPage.jsx:56 ~ useEffect ~ token:", token);
      if (token) {
        navigate("/");
      }
    };
    checkToken();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto no-scrollbar h-full w-full bg-[url('https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-no-repeat bg-cover">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-semibold text-white"
        >
          Food Order Website
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
              Sign up your account
            </h1>
            <div className="space-y-4 md:space-y-6" action="#">
              <div>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  placeholder="customer@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  placeholder="Nguyen Van A"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div>
                <TextField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  placeholder="0904.456.789"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </div>
              <div>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  placeholder="Customer Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </div>
              <div className="">
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    style={{ color: "#666674" }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    type={togglePassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setTooglePassword((show) => !show)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {togglePassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    sx={`& .${outlinedInputClasses.notchedOutline} {
                      border-color: #E0E3E7;
                    }
                    &:hover .${outlinedInputClasses.notchedOutline} {
                      border-color: #B2BAC2;
                    }
                    &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
                      border-color: #6F7E8C;
                    }`}
                  />
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {formik.touched.password && formik.errors.password}
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    style={{ color: "#666674" }}
                  >
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    name="password_confirmation"
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password_confirmation &&
                      Boolean(formik.errors.password_confirmation)
                    }
                    helperText={
                      formik.touched.password_confirmation &&
                      formik.errors.password_confirmation
                    }
                    type={toggleConfirmPw ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setToogleConfirmPw((show) => !show)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {toggleConfirmPw ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    sx={`& .${outlinedInputClasses.notchedOutline} {
                      border-color: #E0E3E7;
                    }
                    &:hover .${outlinedInputClasses.notchedOutline} {
                      border-color: #B2BAC2;
                    }
                    &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
                      border-color: #6F7E8C;
                    }`}
                  />
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {formik.touched.password_confirmation &&
                      formik.errors.password_confirmation}
                  </FormHelperText>
                </FormControl>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} size="1.25rem" />
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
