import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductoList";
import useProducts from "../hooks/useProducts";

function Category() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const { getProductByCategory, products } = useProducts();
  useEffect(() => {
    async function pedirProductosPorCategoria() {
      setLoading(true);
      if (category) {
            await getProductByCategory(category);
      }
      setLoading(false);
    }
    pedirProductosPorCategoria();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="bg-yellow-200 border border-yellow-400 text-yellow-800 px-6 py-4 rounded shadow text-center">
            No hay productos en esta categoría.
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-700 pt-20 px-4">
          <div className="w-full">
            <h1 className="text-blue-400 text-center text-3xl mb-2 font-bold">
              Productos
            </h1>
            <p className="text-gray-300 text-center text-2xl mb-8">
              {category}
            </p>
          </div>
          <ProductList products={products} />
        </div>
      )}
    </div>
  );
}

export default Category;
