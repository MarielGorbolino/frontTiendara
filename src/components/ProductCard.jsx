import { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
const PRODUCT_PRICE = 15000
const PORCENTAJE = 0.25

function ProductCard({ product }) {
  const {updateProductCart} = useCart()
  useEffect(() => {
  }, []);

  function addtocart(){
    updateProductCart(product._id)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <Link to={"/product/" + (product._id || product.id)}>
        <h2 className="text-blue-400 font-bold text-lg m-10">{product.title}</h2>
        <img className="w-full h-80 object-cover rounded-lg" src={product.images[0]} alt={product.title} /> 
        <p className="text-gray-300 text-justify py-2">{product.description}</p>
        <p>{`Precio: $${product.price}`}</p>
        <p>{`Envio: ${product.price > PRODUCT_PRICE ? "GRATIS": "$" + product.price * PORCENTAJE}`}</p>
        <div>
          <p>{product.rating?.rate}</p>
          <p>{product.rating?.count}</p>
        </div>
      </Link>
      <div className="flex justify-end mt-3">
        <button 
          onClick={addtocart}
          className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md flex items-center cursor-pointer"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
