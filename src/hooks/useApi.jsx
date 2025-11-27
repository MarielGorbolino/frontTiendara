import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
const apiBaseUrl = import.meta.env.VITE_URL_BACK;

export function useApi() {
  const { accessToken, refreshAccessToken } = useAuth();

  const request = async (ruta, method = "GET", body = null, retry = 0) => {
    const url = apiBaseUrl + ruta;
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };

      if (body) options.body = JSON.stringify(body);

      let res = await fetch(url, options);

      if (res.status === 403 && retry === 0) {
        const refreshed = await refreshAccessToken();

        if (refreshed?.accessToken) {
          return request(ruta, method, body, retry + 1);
        } else {
          Swal.fire({
            icon: "error",
            text: "Sesión expirada",
          });
          return null;
        }
      }

      if (!res.ok) {
        return null;
      }

      return await res.json();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: `Error  de conexión: ${error.message}`,
      });
      return null;
    }
  };

  return { request };
}
