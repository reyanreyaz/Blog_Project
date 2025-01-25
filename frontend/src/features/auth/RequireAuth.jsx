import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken, logOut, setCredentials } from "./authSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};

const refreshAccessToken = async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:7777/refresh", {
      withCredentials: true,
    });
    dispatch(
      setCredentials({ userId: data.userId, accessToken: data.accessToken })
    );
    return true;
  } catch (err) {
    console.error("Session Expired! ", err.message);
    dispatch(logOut());
    return false;
  }
};

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isValidSession, setIsValidSession] = useState(true); // New state to track session validity

  useEffect(() => {
    const handleTokenRefresh = async () => {
      if (token && isTokenExpired(token)) {
        setIsRefreshing(true);
        const refreshed = await refreshAccessToken(dispatch);
        setIsRefreshing(false);

        if (!refreshed) {
          setIsValidSession(false); // Mark session as invalid only if refresh fails
        }
      }
    };

    handleTokenRefresh();
  }, [token, dispatch]);

  if (!token || (!isValidSession && !isRefreshing)) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return isRefreshing ? <div>Loading...</div> : <Outlet />;
};

export default RequireAuth;
