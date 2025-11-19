import useCart from "../hooks/useCart";

function CartProduct({ item }) {
  const { deleteProduct, addOneProduct, removeOneProduct } = useCart();

  const product = item.product;
  const subtotal = item.quantity * item.price;

  return (
    <div className="bg-gray-900 rounded-lg p-4 relative text-white">
      <button onClick={() => { deleteProduct(product._id) }}>cerrar</button>
      <div>
        <div>
          <img className="w-20 h-20 object-contain rounded-lg" src={product.image || '/placeholder-image.png'} alt={product.title} />
        </div>
        <h3>{product.title}</h3>
        <p>${item.price} x {item.quantity} = ${subtotal.toFixed(2)}</p>
        <div>
          <button onClick={() => { addOneProduct(product._id) }}>+1</button>
          <span>|{item.quantity}|</span>
          <button onClick={() => { removeOneProduct(product._id) }}>-1</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
