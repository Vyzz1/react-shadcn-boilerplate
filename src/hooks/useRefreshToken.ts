import { baseURL } from "@/api/axios";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useLogout from "./useLogout";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const useRefreshToken = (isInProtectedRoutes = true) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const refresh = async () => {
    return mutex.runExclusive(async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });

        setAuth((prev) => ({
          ...prev,
          accessToken: response.data.accessToken,
        }));

        return response.data.accessToken;
      } catch (error) {
        console.error("Refresh token error:", error);
        await logout();
        if (isInProtectedRoutes) {
          navigate("/login", { replace: true, state: { from: location } });
        }
      }
    });
  };

  return refresh;
};

export default useRefreshToken;
