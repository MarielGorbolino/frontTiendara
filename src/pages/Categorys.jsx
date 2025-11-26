import Swal from "sweetalert2";
import CategoryItem from "../components/CategoryItem";
import Paginado from "../components/Paginado";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

function Categorys() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { request } = useApi();
  const pageSize = 6;

  useEffect(() => {
    fetchProducts();
  }, [page]);

  async function fetchProducts() {
    setLoading(true);

    try {
      const response = await request(
        `/api/category?page=${page}&limit=${pageSize}`
      );

      setCategories(response.data || []);
      setTotalPages(response.totalPages || 1);
      setLoading(false);

    } catch (e) {
      setError(e.message);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener los productos",
      });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-700 text-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-blue-400 text-xl">Cargando categorías...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16">
        <div className="relative z-10 mx-auto max-w-7xl mb-8 flex justify-center items-center">
          <div className="text-center">
            <p className="text-blue-400 text-xl mb-4">Error al cargar categorías:</p>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
      <div className="relative z-10 mx-auto max-w-7xl mb-8">
        
        <h1 className="text-blue-400 text-center text-5xl font-bold mb-4">
          Categorías
        </h1>

        <p className="text-center text-xl text-gray-300 mb-12">
          Encontrarás de todo tipo de cosas.
        </p>

        {categories.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 text-xl">No hay categorías disponibles</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryItem category={category} key={category._id || category.name} />
              ))}
            </div>

            <Paginado
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Categorys;
