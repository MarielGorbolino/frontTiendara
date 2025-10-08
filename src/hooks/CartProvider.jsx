import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /*
  titulo
  precio
  desc
  img
  cantidad
  subtotal
  */

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addProductToCart(product, quantity = 1) {
    setCart((prevCart) => {
      const existeItem = prevCart.find((item) => item.id === product.id);
      if (existeItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subTotal: item.price * (item.quantity + quantity),
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity,
            subTotal: product.price * quantity,
          },
        ];
      }
    });
  }

  function deleteProduct(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function addOneProduct(productId) {
     setCart((prevCart)=>prevCart.map(item=> item.id===productId ? {...item,quantity:item.quantity+1} : item ))
  }

  function removeOneProduct(productId) {
    setCart((prevCart)=>prevCart.map(item=> item.id===productId && item.quantity>1 ? {...item,quantity:item.quantity-1} : item ))
    cart.map(item=> item.id===productId && item.quantity == 1 ? deleteProduct(productId) : item )
  }

  function clearCart() {
    setCart([]);
  }

  function getTotal() {
    return cart.reduce((total,item)=> total+(item.subTotal),0).toFixed(2)
  }

  function getTotalItems() {
    return cart.reduce((cantidadItems,item)=> cantidadItems+(item.quantity),0)
  }

  const value = {
    cart,
    addProductToCart,
    deleteProduct,
    addOneProduct,
    removeOneProduct,
    clearCart,
    getTotal,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
