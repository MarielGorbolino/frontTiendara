import { useEffect, useState , useContext} from "react";
import { useParams, useLocation } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";

function ProductDetail() {
 const { id } = useParams();
  const location = useLocation();

  // 👉 Acá tomás addProductToCart del contexto
  const { addProductToCart } = useContext(CartContext);

  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    if (!product) {
      fetchProduct();
    }
  }, [id]);

  async function fetchProduct() {
    const apiBaseUrl = import.meta.env.VITE_URL_BACK;
    const res = await fetch(`${apiBaseUrl}/api/products/${id}`);
    const data = await res.json();
    setProduct(data.data);
  }

  if (!product) return <div className="text-white p-4">Cargando...</div>;


  if (!product) return <div className="text-white p-4">Cargando...</div>;

  return (
    <div className="bg-gray-700 min-h-screen pt-56 px-4 pb-12">
      <div className="text-white text-center mb-8">
        <h1 className="text-4xl font-bold">{product.title}</h1>
      </div>
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded"
        />
        <div className="text-white flex-1">

          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-emerald-400 text-2xl font-bold mb-4">
            ${product.price}
          </p>
         
          <p className="text-gray-300 mb-4">
            Categoría: {product.category?.name}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">12 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">${Math.ceil((product.price / 12) * 100) / 100}</span>
          </p>
          <p className="mb-4">
            <span className="text-gray-300">6 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">${Math.ceil((product.price / 6) * 100) / 100}</span>
          </p>
          <p className="mb-4">
            Envío GRATIS a AMBA
          </p>
           <p className="text-gray-300 mb-2">
            Stock: {product.stock > 0 ? product.stock : "Agotado"}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">Retiro GRATIS en sucursal</span>{" "}
            <span className="text-green-300 font-semibold">¡Retiralo YA!</span>
          </p>
          <button className="bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded" onClick={() => {
  addProductToCart(product);
}}>
            Agregar al carrito
          </button>
        </div>
      </div>
      <div className="text-white text-center mb-8 mt-16">
        <h1 className="text-4xl font-bold">{product.title}</h1>
      </div>
    </div>
  );
}

export default ProductDetail;
