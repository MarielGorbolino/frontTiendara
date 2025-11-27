import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import Swal from "sweetalert2";
import ProductsPage from "../components/ProductsPage";
function Products() {
  const [products, setProducts] = useState();

  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { request } = useApi();

  function handleSearchSubmit() {
    setSearch(searchInput);
    setPage(1);
  }
  const pageSize = 6;

  useEffect(() => {
    fetchProducts();
  }, [search, sort, page]);

  async function fetchProducts() {
    setLoading(true);
    
    try {
      const response = await request(`/api/products/filter?search=${search}&sort=${sort}&page=${page}&limit=${pageSize}`);
      setProducts(response.data);
      setTotalPages(response?.totalPages);
      setShowMessage(!products || products.length === 0);
      setLoading(false);
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: "Error al obtener los productos",
      });
    }
  
  }

  const productsData = {
    products,
    loading,
    showMessage,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    searchInput,
    setSearchInput,
    handleSearchSubmit,
  };

  return <ProductsPage productsData={productsData} />;
}

export default Products;
