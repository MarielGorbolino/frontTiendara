import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductoList";
function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    pedirProductosPorCategoria();
  }, [category]);

  async function pedirProductosPorCategoria() {
    if (category) {
      console.log("Categoria:", category);
      const urlbase = import.meta.env.VITE_URL_BACK;
      const res = await fetch(`${urlbase}/api/products/category/${category}`);
      const data = await res.json();
      console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", `${urlbase}/api/products/category/${category}`);

      setProducts(data.data);
    }
  }

  return (
    <div>
      <div>{products.length > 0 && <ProductList products={products} />}</div>

      <div className="flex items-center justify-center min-h-screen">
        {products.length == 0 && <p>No hay productos en esta categoría.</p>}
      </div>
    </div>
  );
}

export default Category;
