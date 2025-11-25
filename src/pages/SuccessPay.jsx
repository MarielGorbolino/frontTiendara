import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function SuccessPay() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-800 px-4">
      
      <CheckCircle className="text-emerald-400" size={64} />

      <h1 className="text-emerald-400 text-3xl font-bold mt-4 mb-2">
        ¡Pago exitoso!
      </h1>

      <p className="text-gray-300 max-w-md">
        Tu pago fue procesado correctamente. Te enviamos un correo con los detalles
        de tu compra.
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          to="/"
          className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500 transition"
        >
          Volver al inicio
        </Link>

        <Link
          to="/products"
          className="bg-emerald-600 px-4 py-2 rounded text-white hover:bg-emerald-500 transition"
        >
          Ver mas productos
        </Link>
      </div>
    </div>
  );
}

export default SuccessPay;
