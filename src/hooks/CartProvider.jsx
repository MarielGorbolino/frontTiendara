import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CartProvider({ children }) {
	const [cart, setCart] = useState(null);
	const { user, accessToken, refreshAccessToken } = useAuth()
	const [intentoPago, setIntentoPago] = useState(null)
	const urlapi = import.meta.env.VITE_URL_BACK || "http://localhost:3008";
	const crearIntentoPago = async () => {
		if (!cart || !cart.detalle || cart.detalle.length == 0) {
			setIntentoPago(null)
			return
		}

		try {
			const total = Math.round(getTotal() * 100)
			const response = await fetch(`${urlapi}/create-payment-intent`, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Authorization": `${accessToken}` },
				body:
					JSON.stringify({
						amount: total
					})
			})
			if (response.ok) {
				const { clientSecret } = await response.json()
				setIntentoPago({ clientSecret, amount: total || 1000 })
				toast.success("intento de pago guardado")
			}
		} catch (e) {
			toast.error("error al obtener y guardar intento de pago", e.message)
		}
	}

	const peticionesCart = useCallback(async (url, metodo = "GET", body = null, retryCount = 0) => {
		if (!user?.id) {
			Swal.fire({
				icon: "info",
				text: "Debes iniciar sesión",
				background: "#47093e",
				confirmButtonColor: "#10b981"
			});}
		try {
			const opciones = {
				method: metodo,
				headers: { "Content-Type": "application/json", "Authorization": `${accessToken}` },
			}
			if (body) opciones.body = JSON.stringify(body)

			const response = await fetch(url, opciones)

			if (response.status === 401 && retryCount === 0) {
				const refreshResult = await refreshAccessToken()
				if (refreshResult?.success) {
					return peticionesCart(url, metodo, body, retryCount + 1)
				} else {
					toast.error("Sesión expirada, por favor inicia sesión nuevamente")
					return
				}
			}

			if (response.ok) {
				const responseJson = await response.json()
				setCart(responseJson.data)
			} 
		} catch (error) {
			toast.error("Error de conexión", error.message)
		}
	}, [accessToken, refreshAccessToken]);

	const getTotal = useCallback(() => {
		if (!cart || !cart.detalle) return "0.00"
		return cart.detalle.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)
	}, [cart]);

	useEffect(() => {
		if (user?.id) {
			peticionesCart(urlapi + "/api/cart")
		} else {
			setCart(null)
			setIntentoPago(null)
		}
	}, [user?.id, peticionesCart, urlapi]);

	async function deleteProductCart(idProducto) {
		await peticionesCart(urlapi + "/api/cart", "DELETE", { idProducto })
	}

	async function removeProductCart(idProducto) {
		await peticionesCart(urlapi + "/api/cart/remove", "POST", { idProducto })
	}

	async function updateProductCart(idProducto) {
		await peticionesCart(urlapi + "/api/cart", "POST", { idProducto })
	}

	async function clearCart() {
		await peticionesCart(urlapi + "/api/cart/clear", "POST")
	}

	function getTotalItems() {
		if (!cart || !cart.detalle) return 0
		return cart.detalle.reduce((cantidadItems, item) => cantidadItems + (item.quantity), 0)
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
		crearIntentoPago
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
