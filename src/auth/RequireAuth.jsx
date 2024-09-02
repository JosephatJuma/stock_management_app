import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { setCompany, setUser } from "../redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import Authenticating from "./Authenticating";
import { useNavigate } from "react-router-dom";
import {changeMode} from "../redux/slices/themeSlice"

const RequireAuth = ({ children }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          //if no token, redirect to log in
          return navigation("/auth");
        } else {
          const decoded = jwtDecode(accessToken, { header: true });
          const currentDate = new Date().getTime() / 1000;

          if (currentDate >= decoded.kid + 2) {
            //Access Token expired
            return navigation("/auth");
          }
          await getUser();
        }
      } catch (error) {
        //if error just navigate to landing screen
        return navigation("/auth");
      } finally {
        setAuthChecked(true);
      }
    };
    setTimeout(() => {
      checkAuth();
    }, 1000);
  }, [navigation]);

  const getUser = async () => {
    try {
      const user = Cookies.get("user");
      if (typeof user === "undefined") {
        // Handle the missing cookie here
        navigation("/auth/signup");
        return;
      }
      const data = JSON.parse(user);
      if (!data) {
        navigation("/auth");
        return;
      }
      dispatch(setUser(data));
      const company = Cookies.get("company");
      if (typeof company === "undefined") {
        // Handle the missing cookie here
        navigation("/company/create");
        return;
      }
      const companyData = JSON.parse(company);
      if (!companyData) {
        navigation("/company/create");
        return;
      }
      dispatch(setCompany(companyData));

      //get theme cookie
      const theme = Cookies.get("theme");
      console.log(theme)
      if (typeof theme === "undefined") {
        dispatch(changeMode("light"));
        return;
      }

      if (!theme) {
        dispatch(changeMode("light"));
        return;
      }
      dispatch(changeMode(theme));
    } catch (error) {
      navigation("/auth");

    }


  };

  return authChecked ? children : <Authenticating />;
};

export default RequireAuth;
