import useCart from "../hooks/useCart";
import CartProduct from "./CartProduct";

function ProductCartList() {
  const { cart } = useCart();

  if (!cart || !cart.detalle || cart.detalle.length === 0) {
    return <p>No hay productos en el carrito</p>;
  }

  return cart.detalle.map((item) => (
    <CartProduct key={item._id} item={item} />
  ));
}

export default ProductCartList;
