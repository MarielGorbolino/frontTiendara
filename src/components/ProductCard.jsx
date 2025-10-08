import { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function ProductCard({ product }) {
  const {addProductToCart} = useCart()
  useEffect(() => {
    console.log(product);
  }, []);

  function addtocart(){
    console.log("se agrego al carrito")
    addProductToCart(product)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <Link to={"/product/" + product.id}>
        <h2 className="text-emerald-400 font-bold text-lg">{product.title}</h2>
        <img className="text-gray-300" src={product.image} alt={product.title} />
        <p className="text-gray-300 text-justify py-2">{product.description}</p>
        <p>{product.price}</p>
        <div>
          <p>{product.rating.rate}</p>
          <p>{product.rating.count}</p>
        </div>
      </Link>
      <button onClick={()=>addtocart()}>add to cart</button>
    </div>
  );
}

export default ProductCard;
