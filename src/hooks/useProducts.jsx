import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useApi } from "./useApi";
import Swal from "sweetalert2";
import CartProvider from "./CartProvider";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const urlapi = import.meta.env.VITE_URL_BACK;
  const { request } = useApi();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await request(urlapi + "/api/products");
      setProducts(res.data);
    } catch (e) {
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
      await request(urlapi + `/api/products/${id}`, "DELETE");
      await fetchProducts();
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Producto eliminado correctamente",
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al eliminar producto" + e.message,
      });
    }
  };

  const updateParcialProduct = async (id, formData) => {
    try {
      await request(urlapi + `/api/products/` + id, "PATCH", formData);
      await fetchProducts();
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Producto actualizado correctamente",
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar producto" + e.message,
      });
    }
  };

   const getProductByCategory = async (category) => {
    try {
      const res = await request(`${urlapi}/api/products/category/${category}`);
      setProducts(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los productos",
      });
    }
  };

    const fetchProduct = async (id) => {
    try {
      const res = await request(`${urlapi}/api/products/${id}`);
      setProducts(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los productos",
      });
    }
  };

   const fetchProductsFilter = async (search, sort, page, pageSize) => {
    try {
      const res = await request(`${urlapi}/api/products/filter?search=${search}&sort=${sort}&page=${page}&limit=${pageSize}`);
      setProducts(res.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
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
    fetchProduct,
    fetchProductsFilter
  };
}
