import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
import Swal from "sweetalert2";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const { request } = useApi();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await request("/api/products");
      setProducts(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      await request(`/api/products/${id}`, "DELETE");
      await fetchProducts();
      Swal.fire({
        icon: "success",
        text: "Producto eliminado correctamente",
      });
    } catch (e) {
      // Swal.fire({
      //   icon: "error",
      //   text: "Error al eliminar producto" + e.message,
      // });
    }
  };

  const updateParcialProduct = async (id, formData) => {
    try {
      await request(`/api/products/` + id, "PATCH", formData);
      await fetchProducts();
      Swal.fire({
        icon: "success",
        text: "Producto actualizado correctamente",
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "Error al actualizar producto" + e.message,
      });
    }
  };

   const getProductByCategory = async (category) => {
    try {
      const res = await request(`/api/products/category/${category}`);
      setProducts(res.data);
      return res.data;
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "Error al obtener los productos",
      });
    }
  };

    const fetchProduct = async (id) => {
    try {
      setIsLoading(true);
      const res = await request(`/api/products/${id}`);
      setIsLoading(false);
      setProduct(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "Error al obtener los productos",
      });
    }
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    deleteProduct,
    updateParcialProduct,
    getProductByCategory,
    product,
    fetchProduct,
  };
}
