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
      const res = await fetch("http://localhost:3002/api/category/"+category)
      const data = await res.json();
      setProducts(data);
    }
  }
  
  return (
    <div>{products.length > 0 && <ProductList products={products} />}</div>
  );
}

export default Category;
