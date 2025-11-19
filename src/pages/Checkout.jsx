import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ResumenCompra from "../components/ResumenCompra";
import EnvioForm from "../components/EnvioForm";
import StripeForm from "../components/StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { ArrowLeft, ShoppingCart } from "lucide-react";

// Configurar Stripe (reemplaza con tu clave pública)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET || "pk_test_...");

const Checkout = () => {
  const { cart, getTotal, clearCart, getTotalItems, intentoPago } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.nombre || "",
    email: user?.email || "",
    address: "",
    city: "",
    country: "Argentina"
  });

  const handleShippingChange = (e) => {
    console.log(shippingInfo)
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  // Redirigir si el carrito está vacío
  if (!cart?.detalle || getTotalItems() === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <ShoppingCart size={64} className="text-blue-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-400 mb-8">Agrega algunos productos antes de proceder al pago</p>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <Elements stripe={stripePromise}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Volver al carrito
            </button>
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información de envío */}
            <EnvioForm 
              shippingInfo={shippingInfo}
              handleShippingChange={handleShippingChange}
            />

            {/* Información del pedido y pago */}
            <div className="space-y-6">
              {/* Resumen del pedido */}
              <ResumenCompra cart={cart} getTotal={getTotal} />

              {/* Información de pago */}
              <StripeForm
                paymentIntent={intentoPago}
                getTotal={getTotal}
                clearCart={clearCart}
                shippingInfo={shippingInfo}
              />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Checkout;
