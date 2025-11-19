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
		images: [],
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
		const files = Array.from(e.target.files);
		if (!files.length) return;

		const maxSizeMB = 1;
		const maxSizeBytes = maxSizeMB * 1024 * 1024;

		const base64Images = [];

		for (const file of files) {
			if (file.size > maxSizeBytes) {
				alert(`La imagen ${file.name} supera el tamaño máximo de ${maxSizeMB} MB`);
				continue;
			}

			const base64 = await fileToBase64(file);
			base64Images.push(base64);
		}

		setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...base64Images],
  }));

	}

	function fileToBase64(file) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.readAsDataURL(file);
		});
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
			images: formData.images,
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
				images: [],
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
				value={formData.images}
				isRequired={false}
				onChangeFn={handleImageChange}
				multiple
			/>
			{formData.images.length > 0 && (
				<div className="flex gap-3 mt-3">
					{formData.images.map((img, i) => (
						<img key={i} src={img} alt="" className="w-24 h-24 object-cover rounded" />
					))}
				</div>
			)}

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
