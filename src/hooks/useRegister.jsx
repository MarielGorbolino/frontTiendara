import { useState } from "react";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_URL_BACK;

      const response = await fetch(`${apiBaseUrl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.mensaje || "Error en el registro");
      }

      const json = await response.json();
      setData(json);

      return json;

    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, data, isLoading, error };
}
