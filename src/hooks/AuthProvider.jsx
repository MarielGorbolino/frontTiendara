import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  //access token
  const [accessToken, setAccessToken] = useState(null);
  //refresh token
  const [refreshToken, setRefreshToken] = useState(null);
  //datos del usuario
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
      console.log("error al cargar los datos: ", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3008"; //https://vercel.miproyecto.com
      const response = await fetch(`${urlapi}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("error en el login");
      }

      const responseData = await response.json();
      console.log(responseData);

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

      return { success: true, data: { accessToken, refreshToken, user: userData } };
    } catch (error) {
      console.log("error en el login: ", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    //disco -> localstorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    //memoria -> ram
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      console.log("llego a la funcion",refreshToken,accessToken)
      if (!refreshToken) {
        throw new Error("no hay refresh token disponble");
      }
      const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3008";
      const response = await fetch(`${urlapi}/api/user/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-refresh-token": refreshToken
        },
      });
      if (!response.ok) {
        // No hacer logout automáticamente, dejar que el componente decida
        throw new Error(`Error ${response.status}: No se pudo refrescar el token`);
      }
      
      const responseJson = await response.json();
      // El backend devuelve accesstoken y refreshtoken en minúsculas
      const newAccessToken = responseJson.data.accesstoken;
      const newRefreshToken = responseJson.data.refreshtoken;

      const userData = newAccessToken
        ? JSON.parse(atob(newAccessToken.split(".")[1]))
        : null;

      // Actualizar el estado
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setUser(userData);

      // Actualizar localStorage
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("llego al final de la funcion",newRefreshToken,newAccessToken)

      return { accessToken: newAccessToken, refreshToken: newRefreshToken, user: userData };
    } catch (error) {
        console.log("error al actualizar el token: ", error)
        // No hacer logout automáticamente aquí tampoco
        return null
    }
  };

  const isAuthenticated = !!accessToken && !!refreshToken

  const value = {
    accessToken,
    refreshToken,
    user,
    isLoading,
    isAuthenticated,
    logout,
    login,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
