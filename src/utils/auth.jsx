import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "AsyncStorage";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { call } from "./api";

export const authContext = createContext();
const Auth = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  // console.log('🚀 ~ file: auth.js:9 ~ Auth ~ userInfo', userInfo);
  const [auth, setAuth] = useState(false);
  // console.log('🚀 ~ file: auth.js:11 ~ Auth ~ auth', auth);/
  // AsyncStorage.getItem('token-user').then((rs) => setUserInfo(JSON.parse(rs)));
  useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem("token-customer");
      const rs = await call(`api/user`);
      setUserInfo(rs);

      // console.log('🚀 ~ file: auth.js:16 ~ fetchData ~ data', data);
      if (data === undefined || data === "null") {
        // console.log('vao day 1');
        setAuth(false);
        setLoading(true);
      } else {
        // console.log('vao day 2');
        setLoading(true);
        setAuth(true);
      }
    }
    fetchData();
  }, []);

  return (
    <authContext.Provider value={userInfo ? userInfo : null}>
      {children}
    </authContext.Provider>
  );
  // (
  //   <authContext.Provider value={JSON.parse(userInfo)}>
  //     {children}
  //   </authContext.Provider>
  // )
};
Auth.propTypes = {
  children: PropTypes.any,
};
export default Auth;
