import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";
import { PencilLine, DollarSign, ImageUp } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";
import Swal from "sweetalert2";



function FormProducto() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		images: [],
		price: "",
		category: "",
		id: "",
		discount: ""
	});
	const { refreshAccessToken, logout, accessToken } = useAuth();
	const { categories } = useCategories();
	const [errors, setErrors] = useState({});
	function validateField(name, value) {
		let errorMsg = "";

		if (name === "title" && (value !== "" && value.trim().length < 3)) {
			errorMsg = "El título debe tener al menos 3 caracteres";
		}

		if (name === "description" && (value !== "" && value.trim().length < 5)) {
			errorMsg = "La drescripcion debe tener al menos 5 caracteres";
		}

		if (name === "price" && (value === "" || Number(value) <= 0)) {
			errorMsg = "El precio debe ser mayor a 0";
		}

		if (name === "stock" && (value === "" || Number(value) <= 0)) {
			errorMsg = "El stock debe ser mayor a 0";
		}


		if (name === "discount") {
			const discountValue = Number(value);
			const priceValue = Number(formData.price);

			if (discountValue < 0) {
				errorMsg = "El descuento no puede ser negativo";
			} else if (discountValue >= priceValue) {
				errorMsg = "El descuento no puede ser mayor o igual al precio";
			}
		}

		setErrors((prev) => ({ ...prev, [name]: errorMsg }));
	}

	function removeImage(index) {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	}

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

		if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.stock || formData.images?.length == 0) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Por favor completa todos los campos requeridos",
			});
			return;
		}

		const productData = {
			title: formData.title,
			description: formData.description,
			price: parseFloat(formData.price),
			category: formData.category,
			stock: parseInt(formData.stock) || 0,
			images: formData.images,
			discount: parseFloat(formData.discount) || 0,
		};

		try {
			let respuesta = await requestCreateProduct(productData, accessToken)

			if (respuesta.status === 401) {
				toast.info("Token expirado, refrescando...");

				const refreshResult = await refreshAccessToken();

				if (refreshResult && refreshResult.accessToken) {
					respuesta = await requestCreateProduct(productData, refreshResult.accessToken)

					if (respuesta.status === 401) {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Sesión expirada, por favor inicia sesión nuevamente",
						});
						// toast.error("Sesión expirada, por favor inicia sesión nuevamente");
						logout();
						navigate("/login");
						return;
					}
				} else {
					Swal.fire({
							icon: "error",
							title: "Error",
							text: "No se pudo refrescar el token",
						});
					//toast.error("No se pudo refrescar el token");
					logout();
					navigate("/login");
					return;
				}
			}

			if (!respuesta.ok) {
				throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
			}

			await respuesta.json();
			Swal.fire({
				icon: "success",
				title: "Producto creado",
				text: "Producto creado correctamente",
				confirmButtonColor: "#10b981"
			});
			toast.success("Producto creado correctamente");

			setFormData({
				title: "",
				description: "",
				images: [],
				price: "",
				stock: "",
				category: "",
				id: "",
				discount: ""
			});
		} catch (error) {
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
				onChangeFn={(e) => {
					setFormData({ ...formData, title: e.target.value });
					validateField("title", e.target.value);
				}}
			/>
			{errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}

			<FormInput
				icon={<PencilLine size={18} />}
				labelText={"Description"}
				inputType={"text"}
				placeholder={
					"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side ..."
				}
				value={formData.description}
				onChangeFn={(e) => {
					setFormData({ ...formData, description: e.target.value });
					validateField("description", e.target.value);
				}}
			/>
			{errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}

			<FormInput
				icon={<DollarSign size={18} />}
				labelText={"Price"}
				inputType={"number"}
				placeholder={"19.99"}
				value={formData.price}
				onChangeFn={(e) => {
					setFormData({ ...formData, price: e.target.value });
					validateField("price", e.target.value);
				}}
			/>
			{errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}

			<FormInput
				icon={<DollarSign size={18} />}
				labelText={"Cantidad en Stock"}
				inputType={"number"}
				placeholder={"2"}
				value={formData.stock}
				onChangeFn={(e) => {
					setFormData({ ...formData, stock: e.target.value });
					validateField("stock", e.target.value);
				}}
			/>
			{errors.stock && <p className="text-red-400 text-sm">{errors.stock}</p>}


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
				<div className="flex gap-3 mt-3 flex-wrap">
					{formData.images.map((img, i) => (
						<div key={i} className="relative">
							<img
								src={img}
								alt=""
								className="w-24 h-24 object-cover rounded border border-gray-600"
							/>
							<button
								type="button"
								onClick={() => removeImage(i)}
								className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-500"
							>
								✕
							</button>
						</div>
					))}
				</div>
			)}
			<div className="flex flex-col text-gray-300 w-full">
				<div className="flex flex-row justify-start items-center gap-2 mb-2">
					<DollarSign size={18} />
					<label className="text-sm font-medium">
						{"Categoria"}
					</label>
				</div>

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
				{errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}


			</div>

			<FormInput
				icon={<DollarSign size={18} />}
				labelText={"Descuento"}
				inputType={"number"}
				placeholder={"200"}
				value={formData.discount}
				onChangeFn={(e) => {
					setFormData({ ...formData, discount: e.target.value });
					validateField("discount", e.target.value);
				}}
			/>
			{errors.discount && <p className="text-red-400 text-sm">{errors.discount}</p>}

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
