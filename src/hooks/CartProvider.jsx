import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth";
import Swal from "sweetalert2";

function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user, accessToken, refreshAccessToken } = useAuth();
  const [intentoPago, setIntentoPago] = useState(null);

  const [loadingId, setLoadingId] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  const urlapi = import.meta.env.VITE_URL_BACK;

  const crearIntentoPago = async () => {
    if (!cart || !cart.detalle || cart.detalle.length === 0) {
      setIntentoPago(null);
      return;
    }

    try {
      const total = Math.round(getTotal() * 100);
      const response = await fetch(`${urlapi}/api/cart/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ amount: total }),
      });

      if (response.ok) {
        const { clientSecret } = await response.json();
        setIntentoPago({ clientSecret, amount: total || 1000 });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al obtener el intento de pago",
      });
    }
  };

  const peticionesCart = useCallback(
    async (
      url,
      metodo = "GET",
      body = null,
      loadingForId = null,
      retryCount = 0
    ) => {
      if (!user?.id) {
        Swal.fire({
          icon: "info",
          text: "Debes iniciar sesión",
          background: "#b0aeae",
          confirmButtonColor: "#10b981",
        });
        return;
      }

      try {
        if (loadingForId) setLoadingId(loadingForId);

        const opciones = {
          method: metodo,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        };

        if (body) opciones.body = JSON.stringify(body);

        const response = await fetch(url, opciones);
        if (response.status === 409 && retryCount === 0) {
          Swal.fire({
            icon: "info",
            text: "No hay stock suficiente para agregar el producto al carrito",
            background: "#b0aeae",
            confirmButtonColor: "#10b981",
          });
        }

        if (response.status === 401 && retryCount === 0) {
          const refreshResult = await refreshAccessToken();
          if (refreshResult?.success) {
            return peticionesCart(
              url,
              metodo,
              body,
              loadingForId,
              retryCount + 1
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Sesión expirada, por favor inicia sesión nuevamente",
            });
            return;
          }
        }

        if (response.ok) {
          const resJson = await response.json();
          setCart(resJson.data);
          return response;
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error de conexión",
        });
      } finally {
        setLoadingId(null);
      }
    },
    [accessToken, refreshAccessToken, user?.id]
  );

  useEffect(() => {
    if (user?.id) {
      setLoadingCart(true);
      peticionesCart(urlapi + "/api/cart").finally(() => setLoadingCart(false));
    } else {
      setCart(null);
      setIntentoPago(null);
    }
  }, [user?.id, peticionesCart, urlapi]);

  async function deleteProductCart(idProducto) {
    await peticionesCart(
      urlapi + "/api/cart",
      "DELETE",
      { idProducto },
      idProducto
    );
  }

  async function removeProductCart(idProducto) {
    await peticionesCart(
      urlapi + "/api/cart/remove",
      "POST",
      { idProducto },
      idProducto
    );
  }

  async function updateProductCart(idProducto) {
    const response = await peticionesCart(
      urlapi + "/api/cart",
      "POST",
      { idProducto },
      idProducto
    );
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Producto agregado al carrito correctamente",
      });
    }
  }

  async function clearCart() {
    await peticionesCart(urlapi + "/api/cart/clear", "POST", null, "clear");
  }


  async function payCart() {
    await peticionesCart(urlapi + "/api/cart/pay", "POST", null, "pay");
  }


  function getTotal() {
    if (!cart || !cart.detalle) return 0;
    return cart.detalle.reduce(
      (tot, item) => tot + item.quantity * item.price,
      0
    ).toLocaleString("es-AR");
  }

  function getTotalItems() {
    if (!cart || !cart.detalle) return 0;
    return cart.detalle.reduce((tot, item) => tot + item.quantity, 0);
  }

  const value = {
    cart,
    intentoPago,
    deleteProductCart,
    updateProductCart,
    clearCart,
    removeProductCart,
    getTotal,
    getTotalItems,
    crearIntentoPago,
    loadingId,
    loadingCart,
    payCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
