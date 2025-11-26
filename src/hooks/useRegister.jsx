import { useState } from "react";
import { useApi } from "./useApi";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const { request } = useApi();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {

      const response = await request("/api/user/register", "POST", formData);
      if (response.code !== 201) {
        const errorJson = await response.json();
        throw new Error(errorJson.mensaje || "Error en el registro");
      }

      setData(response.data);
      return response.data;

    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, data, isLoading, error };
}
