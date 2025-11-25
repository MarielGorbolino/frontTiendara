import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ResumenCompra from "../components/ResumenCompra";
import EnvioForm from "../components/EnvioForm";
import StripeForm from "../components/StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import CartEmpty from "../components/CartEmpty";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET);

const Checkout = () => {
  const {
    cart,
    getTotal,
    clearCart,
    getTotalItems,
    intentoPago,
    crearIntentoPago,
    loadingCart,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    country: "Argentina",
  });

  const isShippingValid =
    shippingInfo.name.trim() !== "" &&
    shippingInfo.email.trim() !== "" &&
    shippingInfo.address.trim() !== "" &&
    shippingInfo.city.trim() !== "" &&
    shippingInfo.country.trim() !== "";

  useEffect(() => {
    if (!intentoPago && cart?.detalle?.length > 0) {
      crearIntentoPago();
    }
  }, [cart]);

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  if (loadingCart) {
    return (
     <div className="min-h-screen bg-gray-700 text-white pt-16 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
        <p className="text-blue-400 text-xl">Cargando...</p>
      </div>
    </div>
    );
  }

  if (!cart?.detalle || getTotalItems() === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <Elements stripe={stripePromise}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Volver al carrito
            </button>
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EnvioForm
              shippingInfo={shippingInfo}
              handleShippingChange={handleShippingChange}
            />

            <div className="space-y-6">
              <ResumenCompra cart={cart} getTotal={getTotal} />

              <StripeForm
                paymentIntent={intentoPago}
                getTotal={getTotal}
                clearCart={clearCart}
                shippingInfo={shippingInfo}
                isShippingValid={isShippingValid}
              />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Checkout;
