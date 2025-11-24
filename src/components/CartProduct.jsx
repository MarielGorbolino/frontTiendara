import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import useCart from "../hooks/useCart";

function CartProduct({ item }) {
  const { removeProductCart, deleteProductCart, updateProductCart } = useCart();

  const product = item.product;
  const subtotal = item.quantity * item.price;

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex gap-4 relative shadow-lg border border-gray-700">
      <button
        onClick={() => deleteProductCart(product?._id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-300"
      >
        <Trash2 size={20} />
      </button>

      <img
        className="w-24 h-24 object-contain rounded-lg bg-gray-900 p-2"
        src={product?.images?.[0] || "/placeholder-image.png"}
        alt={product?.title}
      />

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-white leading-tight">
          {product?.title}
        </h3>

        <p className="text-sm text-gray-300">
          ${item.price} c/u
        </p>

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => removeProductCart(product._id)}
            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full"
          >
            <Minus size={16} />
          </button>

          <span className="text-white font-semibold w-6 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => updateProductCart(product._id)}
            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-end">
        <p className="text-green-400 font-bold text-lg">
          ${subtotal.toFixed(2)}
        </p>
        <span className="text-xs text-gray-400">Subtotal</span>
      </div>
    </div>
  );
}

export default CartProduct;
