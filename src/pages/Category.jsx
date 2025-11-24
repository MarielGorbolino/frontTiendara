import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductoList";

function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    pedirProductosPorCategoria();
  }, [category]);

  async function pedirProductosPorCategoria() {
    setLoading(true);
    if (category) {
      const urlbase = import.meta.env.VITE_URL_BACK;
      const res = await fetch(`${urlbase}/api/products/category/${category}`);
      const data = await res.json();
      setProducts(data.data || []);
      setShowMessage(!data.data || data.data.length === 0);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      {loading ? (
       <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
      </div>
      ) : products.length > 0 ? (
        <ProductList products={products} />
      ) : showMessage ? (
        <div className="bg-yellow-200 border border-yellow-400 text-yellow-800 px-6 py-4 rounded shadow text-center">
          No hay productos en esta categoría.
        </div>
      ) : null}
    </div>
  );

}

export default Category;
