import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const localAccessToken = localStorage.getItem("accessToken");
      const localRefreshToken = localStorage.getItem("refreshToken");
      const localUserToken = localStorage.getItem("user");

      if (localAccessToken && localRefreshToken) {
        setAccessToken(localAccessToken);
        setRefreshToken(localRefreshToken);
        if (localUserToken && localUserToken !== "undefined") {
          const user = JSON.parse(localUserToken);
          setUser(user);
        }
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const urlapi = import.meta.env.VITE_URL_BACK;
      const response = await fetch(`${urlapi}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      if (!response.ok) {
        throw new Error("error en el login");
      }

      const responseData = await response.json();

      const accessToken = responseData.data.accesstoken;
      const refreshToken = responseData.data.refreshtoken;

      const userData = accessToken
        ? JSON.parse(atob(accessToken.split(".")[1]))
        : null;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(userData);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        success: true,
        data: { accessToken, refreshToken, user: userData },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) {
        throw new Error("no hay refresh token disponble");
      }
      const urlapi = import.meta.env.VITE_URL_BACK;
      const response = await fetch(`${urlapi}/api/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-refresh-token": refreshToken,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudo refrescar el token`
        );
      }

      const responseJson = await response.json();
      const newAccessToken = responseJson.data.accesstoken;
      const newRefreshToken = responseJson.data.refreshtoken;

      const userData = newAccessToken
        ? JSON.parse(atob(newAccessToken.split(".")[1]))
        : null;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setUser(userData);

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: userData,
      };
    } catch (error) {
      return null;
    }
  };

  const isAuthenticated = !!accessToken && !!refreshToken;

  const value = {
    accessToken,
    refreshToken,
    user,
    isLoading,
    isAuthenticated,
    logout,
    login,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
