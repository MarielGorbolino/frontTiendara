import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export function useApi() {
  const { accessToken, refreshAccessToken } = useAuth();

  const request = async (url, method = "GET", body = null, retry = 0) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken
        }
      };

      if (body) options.body = JSON.stringify(body);

      let res = await fetch(url, options);

      if (res.status === 401 && retry === 0) {
        const refreshed = await refreshAccessToken();

        if (refreshed?.success) {
          return request(url, method, body, retry + 1);
        }

        toast.error("Sesión expirada");
        return null;
      }

      if (!res.ok) {
        toast.error(`Error: ${method} ${url}`);
        return null;
      }

      return await res.json();
    } catch (error) {
      toast.error("Error de conexión", error.message);
      return null;
    }
  };

  return { request };
}
