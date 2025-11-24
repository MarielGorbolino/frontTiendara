import useCart from "../hooks/useCart";
import ProductCartList from "../components/ProductCartList";
import TotalCarrito from "../components/TotalCarrito";
import { useEffect } from "react";


function Cart() {
  const { cart,crearIntentoPago } = useCart();

  useEffect(()=>{
      crearIntentoPago()
  },[])

  if (!cart || !cart.detalle || cart.detalle.length === 0) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
        <h1 className="text-blue-400 text-center text-5xl font-bold mb-4">
          Carrito
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Sin Productos en el carrito
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
      <h1 className="text-blue-400 text-center text-5xl font-bold mb-4">
        Carrito
      </h1>
      <p className="text-center text-xl text-gray-300 mb-6">
        Listado de productos en el carrito
      </p>
      <ProductCartList className="mt-12" />
      <TotalCarrito/>
    </div>
  );
}

export default Cart;
