import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductoList";
import useProducts from "../hooks/useProducts";

function Products() {
  const { category } = useParams();
  const { fetchProductsFilter, products } = useProducts();

  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  function handleSearchSubmit() {
    setSearch(searchInput);
    setPage(1);
  }
  const pageSize = 6;

  useEffect(() => {
    fetchProducts();
  }, [category, search, sort, page]);

  async function fetchProducts() {
    setLoading(true);
    fetchProductsFilter(search, sort, page, pageSize);
    setTotalPages(products.totalPages || 1);
    setShowMessage(!products.data || products.data.length === 0);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-700 pt-20 px-4">
      <div className="w-full">
        {" "}
        <h1 className="text-blue-400 text-center text-3xl mb-2 font-bold">
          Productos
        </h1>{" "}
        <p className="text-gray-300 text-center mb-8">
          Los mejores productos que encontraras
        </p>{" "}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex w-full md:w-1/3">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 text-white bg-gray-900 rounded-l border border-gray-600 w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-green-900 text-white rounded-r"
          >
            Buscar
          </button>
        </div>

        <select
          className="px-3 py-2 text-white bg-gray-900 rounded border border-gray-600 w-full md:w-1/4"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio (menor a mayor)</option>
          <option value="price-desc">Precio (mayor a menor)</option>
          <option value="name-asc">Nombre (A → Z)</option>
          <option value="name-desc">Nombre (Z → A)</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mb-4"></div>
          <p className="text-blue-400 text-xl">Cargando productos...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <ProductList products={products} />

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Anterior
            </button>

            <span className="text-white text-lg">
              Página {page} de {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-40"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Siguiente ➡
            </button>
          </div>
        </>
      ) : showMessage ? (
        <div className="bg-yellow-200 border border-yellow-400 text-yellow-800 px-6 py-4 rounded shadow text-center">
          No hay productos
        </div>
      ) : null}
    </div>
  );
}

export default Products;
