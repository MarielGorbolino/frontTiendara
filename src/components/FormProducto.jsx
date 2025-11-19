import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";
import { PencilLine, DollarSign, ImageUp } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";


function FormProducto() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: "",
		price: "",
		category: "",
		id: "",
	});
	const { refreshAccessToken, logout, accessToken } = useAuth();
	const { categories } = useCategories();


	function navigateToHome() {
		navigate(-1);
	}

	async function handleImageChange(e) {
		const file = e.target.files?.[0];
		if (!file) return;

		const maxSizeMB = 1; // tamaño máximo permitido (1 MB)
		const maxSizeBytes = maxSizeMB * 1024 * 1024;

		if (file.size > maxSizeBytes) {
			alert(`La imagen supera el tamaño máximo de ${maxSizeMB} MB`);
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result;
			setFormData({ ...formData, image: base64 });
		};
		reader.readAsDataURL(file);

	}

	async function requestCreateProduct(newProduct, token) {
		const apiBaseUrl =
			import.meta.env.VITE_URL_BACK || "http://localhost:3008";

		return await fetch(`${apiBaseUrl}/api/products`, {
			method: "POST",
			body: JSON.stringify(newProduct),
			headers: {
				"Content-Type": "application/json",
				authorization: `${token}`,
			},
		});
	}

	async function saveProduct(e) {
		e.preventDefault();

		if (!formData.title || !formData.price || !formData.category) {
			toast.error("Por favor completa todos los campos requeridos");
			return;
		}

		const productData = {
			title: formData.title,
			description: formData.description,
			price: parseFloat(formData.price),
			category: formData.category,
			stock: parseInt(formData.stock) || 0,
			image: formData.image,
		};

		try {
			let respuesta = await requestCreateProduct(productData, accessToken)

			if (respuesta.status === 401) {
				toast.info("Token expirado, refrescando...");

				const refreshResult = await refreshAccessToken();

				if (refreshResult && refreshResult.accessToken) {
					respuesta = await requestCreateProduct(productData, refreshResult.accessToken)

					console.log("llego", respuesta);

					if (respuesta.status === 401) {
						toast.error("Sesión expirada, por favor inicia sesión nuevamente");
						logout();
						navigate("/login");
						return;
					}
				} else {
					toast.error("No se pudo refrescar el token");
					logout();
					navigate("/login");
					return;
				}
			}

			if (!respuesta.ok) {
				throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
			}

			const data = await respuesta.json();
			console.log(data);
			toast.success("Producto creado correctamente");

			setFormData({
				title: "",
				description: "",
				image: "",
				price: "",
				category: "",
				id: "",
			});
		} catch (error) {
			console.error("Error al crear producto:", error);
			toast.error(`Error al crear el producto: ${error.message}`);
		}
	}

	return (
		<form
			onSubmit={saveProduct}
			className="space-y-5 flex flex-col justify-center px-8 pb-8"
		>
			<FormInput
				icon={<PencilLine size={18} />}
				labelText={"Title"}
				inputType={"text"}
				placeholder={"Mens Casual Slim Fit"}
				value={formData.title}
				onChangeFn={(e) => setFormData({ ...formData, title: e.target.value })}
			/>

			<FormInput
				icon={<PencilLine size={18} />}
				labelText={"Description"}
				inputType={"text"}
				placeholder={
					"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side ..."
				}
				value={formData.description}
				onChangeFn={(e) =>
					setFormData({ ...formData, description: e.target.value })
				}
			/>

			<FormInput
				icon={<DollarSign size={18} />}
				labelText={"Price"}
				inputType={"number"}
				placeholder={"19.99"}
				value={formData.price}
				onChangeFn={(e) => setFormData({ ...formData, price: e.target.value })}
			/>

			<FormInput
				icon={<DollarSign size={18} />}
				labelText={"Cantidad en Stock"}
				inputType={"number"}
				placeholder={"2"}
				value={formData.stock}
				onChangeFn={(e) => setFormData({ ...formData, stock: e.target.value })}
			/>


			<FormInput
				icon={<ImageUp size={18} />}
				labelText={"Image"}
				inputType={"file"}
				value={formData.image}
				isRequired={false}
				onChangeFn={handleImageChange}
			/>

			<select
				name="category"
				id="category"
				value={formData.category}
				onChange={(e) => setFormData({ ...formData, category: e.target.value })}
				className="text-white bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			>
				<option value="">Select category</option>
				{categories.map((cat) => (
					<option value={cat._id} key={cat._id}>
						{cat.name}
					</option>
				))}
			</select>



			<div className="flex flex-row justify-center gap-4 pt-6">
				<button
					onClick={() => navigateToHome()}
					className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center"
				>
					Volver
				</button>
				<button
					type="submit"
					className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center"
				>
					Enviar
				</button>
			</div>
		</form>
	);
}

export default FormProducto;
