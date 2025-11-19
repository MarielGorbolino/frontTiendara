import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CreditCard, Shield } from "lucide-react";

const StripeForm = ({ paymentIntent, getTotal, shippingInfo,clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      console.log(paymentIntent);
      /*if (!paymentIntent || !paymentIntent.clientSecret) {
        console.log("intento de pago error");
        throw new Error("No se encontró un PaymentIntent válido. Intente recargar la página.");
      }*/

      const clientSecret = paymentIntent.clientSecret;
      console.log('Usando PaymentIntent existente:', clientSecret ? 'Presente' : 'Ausente');

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingInfo?.name || "Usuario",
            email: shippingInfo?.email || "usuario@ejemplo.com"
          }
        }
      });

      if (error) {
        toast.error(`Error en el pago: ${error.message}`);
        console.log(error.message);
        navigate("/errorPay");
      } else {
        toast.success("¡Pago realizado exitosamente!");
        navigate("/successPay");
        //registrar pedido en db
        clearCart()
      }
    } catch (error) {
      toast.error("Error al procesar el pago");
      console.log(error);
      navigate("/errorPago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <CreditCard size={20} />
        Información de pago
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Datos de la tarjeta
          </label>
          <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
            <CardElement options={cardStyle} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Shield size={16} />
          <span>Pago seguro con Stripe</span>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-md transition-colors"
        >
          {loading ? 'Procesando...' : `Pagar $${getTotal()}`}
        </button>
      </form>
    </div>
  );
};

export default StripeForm;
