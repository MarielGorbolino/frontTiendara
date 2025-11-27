import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Ban, LogOut, Save, SquarePen, User } from "lucide-react";
import Swal from "sweetalert2";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

function Perfil() {
  const { request } = useApi();
  const navigate = useNavigate();
  const { logout, isLoading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [original, setOriginal] = useState({});

  function logoutLocal() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    if (!isLoading) {
      fetchUser();
    }
  }, [isLoading]);

  function validateField(name, value) {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "El nombre es obligatorio";
      else if (value.length < 3) error = "Mínimo 3 letras";
    }

    if (name === "lastName") {
      if (!value.trim()) error = "El apellido es obligatorio";
      else if (value.length < 3) error = "Mínimo 3 letras";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Email inválido";
    }

    if (name === "birthdate") {
      if (!value) {
        error = "La fecha de nacimiento es obligatoria";
      } else {
        const fecha = new Date(value);
        const hoy = new Date();

        if (isNaN(fecha.getTime())) {
          error = "Fecha inválida";
        } else if (fecha > hoy) {
          error = "La fecha no puede ser futura";
        } else {
          const edad = hoy.getFullYear() - fecha.getFullYear();
          const mes = hoy.getMonth() - fecha.getMonth();
          const dia = hoy.getDate() - fecha.getDate();
          const edadReal = mes < 0 || (mes === 0 && dia < 0) ? edad - 1 : edad;

          if (edadReal < 13) {
            error = "Debes tener al menos 13 años";
          } else if (edadReal > 120) {
            error = "Fecha inválida";
          }
        }
      }
    }

    return error;
  }

  async function fetchUser() {
    try {
      setLoading(true);
      const response = await request(`/api/user`);
      const userData = response.data;

      setUser(userData);
      setForm({
        name: userData.name || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        birthdate: userData.birthdate ? userData.birthdate.split("T")[0] : "",
        role: userData.role || "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;

    // Actualizo form
    setForm((prev) => ({ ...prev, [name]: value }));

    // Valido
    const error = validateField(name, value);

    // Actualizo errores
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();

    try {
      const res = await request(`/api/user`, "PUT", form);

      setUser(res.data);
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Los cambios se guardaron correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.message,
      });
    }
  }

  const handleEditar = () => {
    setOriginal(form);
    setEditMode(true);
  };

  const handleCancelar = () => {
    setForm(original);
    setErrors({});
    setEditMode(false);
  };

  function hasErrors() {
    if (
      !form.name.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.birthdate
    )
      return true;

    return Object.values(errors).some((err) => err && err.length > 0);
  }
  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 flex justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 rounded-full p-4 mb-3">
            <User size={64} />
          </div>
          <h2 className="text-3xl font-bold mb-1">
            {user.name} {user.lastName}
          </h2>
          <p className="text-gray-300">{user.email}</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              labelText="Nombre"
              inputType="text"
              value={form.name}
              onChangeFn={handleChange}
              name="name"
              disabled={!editMode}
              error={errors.name}
            />

            <FormInput
              labelText="Apellido"
              inputType="text"
              value={form.lastName}
              onChangeFn={handleChange}
              name="lastName"
              disabled={!editMode}
              error={errors.lastName}
            />

            <FormInput
              labelText="Email"
              inputType="email"
              value={form.email}
              onChangeFn={handleChange}
              name="email"
              disabled={!editMode}
              error={errors.email}
            />

            <FormInput
              labelText="Fecha de nacimiento"
              inputType="date"
              value={form.birthdate}
              onChangeFn={handleChange}
              name="birthdate"
              disabled={!editMode}
              error={errors.birthdate}
            />
          </div>

          <div>
            <FormInput
              labelText="Rol"
              inputType="text"
              value={user.role}
              onChangeFn={handleChange}
              name="role"
              disabled={true}
            />
          </div>
        </form>

        {!editMode ? (
          <button
            onClick={handleEditar}
            className="mt-6 w-full bg-blue-600 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <SquarePen size={20} />
            Actualizar
          </button>
        ) : (
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              disabled={hasErrors()}
              className={`flex-1 py-2 rounded flex items-center justify-center gap-2
      ${
        hasErrors()
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-emerald-700 hover:bg-emerald-600"
      }`}
            >
              <Save size={20} />
              Guardar
            </button>

            <button
              onClick={handleCancelar}
              className="flex-1 bg-red-600 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
            >
              <Ban size={20} />
              Cancelar
            </button>
          </div>
        )}

        <button
          onClick={logoutLocal}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg flex justify-center items-center gap-2"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Perfil;
