import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";
import { useAuth } from "../hooks/useAuth";
import useProducts from "../hooks/useProducts";

const PRODUCT_PRICE = 15000;
const PORCENTAJE = 0.25;

function ProductDetail() {
  const { id } = useParams();
  const { updateProductCart } = useContext(CartContext);
  const { user } = useAuth();
  const { fetchProduct, products } = useProducts();
  const [mainImage, setMainImage] = useState(products?.images?.[0] || []);

  useEffect(() => {
      fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (products?.images?.length > 0) {
      setMainImage(products.images[0]);
    }
  }, [products]);

  if (!products) return <div className="text-white p-4">Cargando...</div>;

  return (
    <div className="bg-gray-700 min-h-screen pt-30 px-4 pb-12">
      <div className="text-white text-center mb-8">
        <h1 className="text-4xl font-bold">{products.title}</h1>
      </div>
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <img
          src={mainImage}
          alt={products.title}
          className="w-full md:w-1/2 h-96 object-cover rounded"
        />

        <div className="text-white flex-1">
          <p className="text-emerald-400 text-2xl font-bold mb-4">
            ${products.price?.toLocaleString("es-AR")}
          </p>

          <p className="text-gray-300 mb-4">
            Categoría: {products.category?.name}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">12 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">
              $
              {(Math.ceil((products.price / 12) * 100) / 100).toLocaleString(
                "es-AR"
              )}
            </span>
          </p>
          <p className="mb-4">
            <span className="text-gray-300">6 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">
              $
              {(Math.ceil((products.price / 6) * 100) / 100).toLocaleString(
                "es-AR"
              )}
            </span>
          </p>
          <p className="mb-4">
            {`${
              products.price > PRODUCT_PRICE
                ? "Envio GRATIS"
                : `Costo del envio: $${(
                    products.price * PORCENTAJE
                  ).toLocaleString("es-AR")}`
            } a AMBA`}
          </p>
          <p className="text-gray-300 mb-2">
            Stock: {products.stock > 0 ? products.stock : "AGOTADO"}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">
              {user?.id && products.stock > 0 ? "Retiro GRATIS en sucursal" : ""}
            </span>{" "}
            <span className="text-green-300 font-semibold">
              {user?.id && products.stock > 0 ? "¡Retiralo YA!" : ""}
            </span>
          </p>
          <button
            onClick={async () => {
              await updateProductCart(products._id);
            }}
            disabled={!user?.id || products.stock === 0}
            title={
              !user?.id ? "Debes iniciar sesión para agregar productos" : ""
            }
            className={`px-4 py-2 rounded ${
              !user?.id || products.stock === 0
                ? "bg-gray-500 cursor-not-allowed" : "bg-emerald-700 hover:bg-emerald-600"
            }`}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
        <div className="max-w-5xl mx-auto mt-8 bg-gray-800 p-6 rounded-lg text-center">
    <p className="text-gray-300 text-lg">
      {products.description || "Sin descripción disponible"}
    </p>
  </div>
      {products.images && products.images.length > 1 && (
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-white text-2xl font-semibold mb-4 text-center">
            Más imágenes del producto
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-full h-40 object-cover rounded border border-gray-600"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
