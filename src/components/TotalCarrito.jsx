import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

function TotalCarrito() {
  const { clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 rounded-lg p-4 relative text-white">
      <div>
        <p>Total a pagar: ${getTotal()}</p>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => { clearCart() }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Vaciar carrito
        </button>
        <button
          onClick={() => { navigate('/checkout') }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default TotalCarrito;
