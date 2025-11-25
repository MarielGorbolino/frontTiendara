import { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
const PRODUCT_PRICE = 15000;
const PORCENTAJE = 0.25;

function ProductCard({ product }) {
  const { user } = useAuth();

  const { updateProductCart } = useCart();
  useEffect(() => {}, []);

  function addtocart() {
    updateProductCart(product._id);
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <Link to={"/product/" + (product._id || product.id)}>
        <h2 className="text-xl font-semibold line-clamp-1 mb-5">
          {product.title}
        </h2>
        <div className="relative w-full">
          <img
            className="w-full h-80 object-cover rounded-lg"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <p className="text-gray-300 text-justify py-2">{`Precio: $${product.price.toLocaleString("es-AR")}`}</p>
        <p>{`Envio: ${
          product.price > PRODUCT_PRICE
            ? "GRATIS"
            : "$" + (product.price * PORCENTAJE).toLocaleString("es-AR")
        }`}</p>
      </Link>
      <div className="flex justify-end mt-3">
        <button
          onClick={addtocart}
          disabled={!user?.id || product.stock === 0}
          title={!user?.id ? "Debes iniciar sesión para agregar productos" : ""}
          className={`px-4 py-2 rounded ${
            user?.id
              ? "bg-emerald-700 hover:bg-emerald-600"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
