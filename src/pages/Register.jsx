import { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { useRegister } from "../hooks/useRegister";

function Register() {
	const [formData, setFormData] = useState({
		nombre: "",
		apellido: "",
		DNI: "",
		email: "",
		contrasenia: "",
		confirmarContrasenia: "",
		fechaNacimiento: "",
	});

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();
	const { registerUser, isLoading, error: registerError } = useRegister();

	const navigateToHome = () => navigate(-1);

	// ------------------------------------
	//  HANDLE CHANGE + VALIDACIONES EN TIEMPO REAL
	// ------------------------------------
	function handleChange(e) {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));

		const error = validateField(name, value);

		setErrors((prev) => ({ ...prev, [name]: error }));
	}

	// ------------------------------------
	//  VALIDACIONES POR CAMPO
	// ------------------------------------
	function validateField(name, value) {
		let error = "";

		if (name === "nombre") {
			if (!value.trim()) error = "El nombre es obligatorio";
			else if (value.length < 3) error = "Mínimo 3 letras";
		}

		if (name === "apellido") {
			if (!value.trim()) error = "El apellido es obligatorio";
			else if (value.length < 3) error = "Mínimo 3 letras";
		}

		if (name === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) error = "Email inválido";
		}

		if (name === "contrasenia") {
			if (value.length < 8) error = "Mínimo 8 caracteres";
		}

		if (name === "confirmarContrasenia") {
			if (value !== formData.contrasenia)
				error = "Las contraseñas no coinciden";
		}

		return error;
	}

	// ------------------------------------
	//  VALIDACIÓN FINAL + LLAMADA AL HOOK
	// ------------------------------------
	async function handleSubmit(e) {
		e.preventDefault();

		const newErrors = {};

		if (!formData.nombre.trim())
			newErrors.nombre = "El nombre es obligatorio";
		else if (formData.nombre.length < 3)
			newErrors.nombre = "El nombre debe tener mínimo 3 letras";

		if (!formData.apellido.trim())
			newErrors.apellido = "El apellido es obligatorio";
		else if (formData.apellido.length < 3)
			newErrors.apellido = "El apellido debe tener mínimo 3 letras";

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) newErrors.email = "Email inválido";

		if (formData.contrasenia.length < 8)
			newErrors.contrasenia = "Mínimo 8 caracteres";

		if (formData.contrasenia !== formData.confirmarContrasenia)
			newErrors.confirmarContrasenia = "Las contraseñas no coinciden";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error("Revisá los campos en rojo");
			return;
		}

		setErrors({});

		// ---------------------------
		//   LLAMADA AL CUSTOM HOOK
		// ---------------------------
		const result = await registerUser({
			email: formData.email,
			password: formData.contrasenia,
			name: formData.nombre,
			lastName: formData.apellido,
			birthdate: formData.fechaNacimiento,
			role: "user",
		});

		if (result) {
			toast.success("Usuario registrado correctamente");
			navigate("/login");
		} else {
			toast.error(registerError || "Error al registrar el usuario");
		}
	}

	return (
		<div className="flex flex-col justify-center bg-gray-700 min-h-screen items-center pt-12">
			<div className="bg-gray-900 rounded-2xl max-w-2xl w-full mx-4">
				<div className="flex justify-center py-4">
					<h1 className="text-2xl font-bold text-blue-400">Register</h1>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5 px-8 pb-8">
					<FormInput
						icon={<User size={18} />}
						labelText="Nombre"
						inputType="text"
						name="nombre"
						placeholder="Juan"
						value={formData.nombre}
						onChangeFn={handleChange}
						error={errors.nombre}
					/>

					<FormInput
						icon={<User size={18} />}
						labelText="Apellido"
						inputType="text"
						name="apellido"
						placeholder="Perez"
						value={formData.apellido}
						onChangeFn={handleChange}
						error={errors.apellido}
					/>

					<FormInput
						icon={<Mail size={18} />}
						labelText="Email"
						inputType="email"
						name="email"
						placeholder="ejemplo@gmail.com"
						value={formData.email}
						onChangeFn={handleChange}
						error={errors.email}
					/>

					<FormInput
						icon={<User size={18} />}
						labelText="Contraseña"
						inputType="password"
						name="contrasenia"
						placeholder="admin123"
						value={formData.contrasenia}
						onChangeFn={handleChange}
						error={errors.contrasenia}
					/>

					<FormInput
						icon={<User size={18} />}
						labelText="Confirmar Contraseña"
						inputType="password"
						name="confirmarContrasenia"
						placeholder="admin123"
						value={formData.confirmarContrasenia}
						onChangeFn={handleChange}
						error={errors.confirmarContrasenia}
					/>

					<FormInput
						icon={<Calendar size={18} />}
						labelText="Fecha de nacimiento"
						inputType="date"
						name="fechaNacimiento"
						value={formData.fechaNacimiento}
						onChangeFn={handleChange}
						error={errors.fechaNacimiento}
					/>

					<div className="flex justify-center gap-4 pt-6">
						<button
							onClick={navigateToHome}
							className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex-1"
						>
							Volver
						</button>

						<button
							type="submit"
							disabled={isLoading}
							className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-3 rounded-md flex-1"
						>
							{isLoading ? "Enviando..." : "Enviar"}
						</button>
					</div>
				</form>

				{registerError && (
					<p className="text-center text-blue-400 pb-4">{registerError}</p>
				)}
			</div>
		</div>
	);
}

export default Register;
