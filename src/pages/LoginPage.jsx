import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginValidationSchema from "../validations/LoginValidation";
import { useFormik } from "formik";
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
  textFieldClasses,
} from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { callNon } from "../utils/api";
import { toast } from "react-toastify";
import { AsyncStorage } from "AsyncStorage";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTooglePassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      const res = callNon(`api/login`, "POST", {
        email: values.email,
        password: values.password,
        type: "customer",
      }).then((res) => {
        console.log(res);
        if (res) setLoading(false);
        if (res.status == 200) {
          AsyncStorage.setItem("token-customer", JSON.stringify(res));
          toast.success(res.message, { autoClose: 2000 });
          window.location.href = "/menu";
        } else {
          toast.error(res.data.message);
        }
        // toast.success(res.)
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-[url('https://images.unsplash.com/photo-1522784081430-8ac6a122cbc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-no-repeat bg-cover">
        <Link
          href="/"
          className="flex items-center mb-6 text-3xl font-semibold text-white"
        >
          Food Order Website
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  placeholder="customer@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    style={{ color: "#666674" }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white outline-none bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} size="1.25rem" />
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
