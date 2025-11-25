import { Link } from "react-router-dom";

function SuccessPay() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-800 px-4">
      <h1 className="text-red-400 text-3xl font-bold mb-4">Pago no procesado</h1>
      <p className="text-gray-300 max-w-md">
        Ocurrió un error durante el pago. Tu tarjeta no fue cargada.
      </p>

      <div className="flex gap-4 mt-6">
        <Link to="/cart" className="bg-gray-600 px-4 py-2 rounded text-white">
          Volver al carrito
        </Link>
        <Link to="/checkout" className="bg-emerald-600 px-4 py-2 rounded text-white">
          Reintentar pago
        </Link>
      </div>
    </div>
  );
}
export default SuccessPay;