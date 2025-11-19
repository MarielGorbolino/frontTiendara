import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth"; // si usás token
import { toast } from "react-toastify";
import { useApi } from "./useApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3008";
    const { request } = useApi();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
    const res = await request(urlapi + "/api/products")
      setProducts(res.data); // ← acá actualizas el estado correctamente
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, urlapi]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    try {
        await request(urlapi + `/api/products/${id}`, "DELETE")
        await fetchProducts();

      toast.success("Producto eliminado");
    } catch (e) {
      console.log(e);
      toast.error("Error al eliminar producto");
    }
  };

    const saveProduct = async (formData) => {
        
    try {
        await request(urlapi + `/api/products`, "POST", JSON.stringify(formData))

      toast.success("Producto creado");
    } catch (e) {
      console.log(e);
      toast.error("Error al crear producto");
    }
  };

  return { products, isLoading, error, fetchProducts, deleteProduct, saveProduct };
}
