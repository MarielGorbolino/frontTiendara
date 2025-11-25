import { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CartContext } from "../hooks/CartContext";
import { useAuth } from "../hooks/useAuth";

const PRODUCT_PRICE = 15000;
const PORCENTAJE = 0.25;

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const { updateProductCart } = useContext(CartContext);
  const { user } = useAuth();

  const [product, setProduct] = useState(location.state?.product || null);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || []);

  useEffect(() => {
    if (!product) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  async function fetchProduct() {
    const apiBaseUrl = import.meta.env.VITE_URL_BACK;
    const res = await fetch(`${apiBaseUrl}/api/products/${id}`);
    const data = await res.json();
    setProduct(data.data);
  }

  if (!product) return <div className="text-white p-4">Cargando...</div>;

  return (
    <div className="bg-gray-700 min-h-screen pt-30 px-4 pb-12">
      <div className="text-white text-center mb-8">
        <h1 className="text-4xl font-bold">{product.title}</h1>
      </div>
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-cover rounded"
        />

        <div className="text-white flex-1">
          <p className="text-gray-300 mb-4">{product.description}</p>
          <p className="text-emerald-400 text-2xl font-bold mb-4">
            ${product.price.toLocaleString("es-AR")}
          </p>

          <p className="text-gray-300 mb-4">
            Categoría: {product.category?.name}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">12 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">
              $
              {(Math.ceil((product.price / 12) * 100) / 100).toLocaleString(
                "es-AR"
              )}
            </span>
          </p>
          <p className="mb-4">
            <span className="text-gray-300">6 cuotas sin interés de </span>{" "}
            <span className="text-green-300 font-semibold">
              $
              {(Math.ceil((product.price / 6) * 100) / 100).toLocaleString(
                "es-AR"
              )}
            </span>
          </p>
          <p className="mb-4">
            {`${
              product.price > PRODUCT_PRICE
                ? "Envio GRATIS"
                : `Costo del envio: $${(
                    product.price * PORCENTAJE
                  ).toLocaleString("es-AR")}`
            } a AMBA`}
          </p>
          <p className="text-gray-300 mb-2">
            Stock: {product.stock > 0 ? product.stock : "Agotado"}
          </p>
          <p className="mb-4">
            <span className="text-gray-300">
              {user?.id && product.stock > 0 ? "Retiro GRATIS en sucursal" : ""}
            </span>{" "}
            <span className="text-green-300 font-semibold">
              {user?.id && product.stock > 0 ? "¡Retiralo YA!" : ""}
            </span>
          </p>
          <button
            onClick={async () => {
              await updateProductCart(product._id);
              await fetchProduct(); // 🔥 vuelve a pedir el producto actualizado
            }}
            disabled={!user?.id || product.stock === 0}
            title={
              !user?.id ? "Debes iniciar sesión para agregar productos" : ""
            }
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
      {product.images && product.images.length > 1 && (
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-white text-2xl font-semibold mb-4 text-center">
            Más imágenes del producto
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-full h-40 object-cover rounded border border-gray-600"
                onClick={() => setMainImage(img)} // cambiar imagen principal al hacer click
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
