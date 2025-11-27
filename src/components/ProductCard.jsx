import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
const PRODUCT_PRICE = 15000;
const PORCENTAJE = 0.25;

function ProductCard({ product, isCategoryPage }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { updateProductCart } = useCart();
  useEffect(() => {}, []);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <Link to={"/product/" + (product._id || product.id)}>
        <h2 className="text-2xl md:text-3xl font-extrabold line-clamp-1 mb-4 text-white">
          {product.title}
        </h2>
        <div className="relative w-full">
          <img
            className="w-full h-80 object-cover rounded-lg"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <div className="mt-4 mb-2">
          <p className="bg-gray-800/30 text-black-400 text-lg font-bold py-1 px-2 rounded inline-block mb-2">
            Precio: ${product.price.toLocaleString("es-AR")}
          </p>
        </div>
        <div>
          {!isCategoryPage && (
            <p className="bg-gray-800/30 text-black-400 text-md font-semibold py-1 px-2 rounded inline-block mb-2">
              Categoría: {product.category.name}
            </p>
          )}
        </div>

        <p
          className={`${
            product.stock > 0
              ? "bg-green-900/30 text-green-300"
              : "bg-red-900/30 text-red-500 font-bold"
          } text-md font-semibold py-1 px-2 rounded inline-block mb-2`}
        >
          {product.stock > 0
            ? `${
                product.stock == 1
                  ? `Queda solo una unidad disponible`
                  : `Quedan ${product.stock} disponibles`
              }`
            : "AGOTADO"}
        </p>
        <div>
          <p className="bg-gray-800/30 text-black-400 text-md font-semibold py-1 px-2 rounded inline-block mb-2">
            Envío:{" "}
            {product.price > PRODUCT_PRICE
              ? "GRATIS"
              : "$" + (product.price * PORCENTAJE).toLocaleString("es-AR")}
          </p>
        </div>
      </Link>
      <div className="flex justify-end mt-3">
        <button
          onClick={async () => {
              setLoading(true);
              await updateProductCart(product._id);
              setLoading(false);
            }}
          disabled={!user?.id || product.stock === 0 || loading}
          title={!user?.id ? "Debes iniciar sesión para agregar productos" : ""}
          className={`px-4 py-2 rounded ${
            !user?.id || product.stock === 0 || loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-emerald-700 hover:bg-emerald-600"
          }`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
