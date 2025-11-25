import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
    const navigate = useNavigate()
return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <ShoppingCart size={64} className="text-blue-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-400 mb-8">Agrega algunos productos antes de proceder al pago</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md"
        >
          Volver a la tienda
        </button>
      </div>
    );
}

export default CartEmpty;