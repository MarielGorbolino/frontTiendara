import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Ban, LogOut, Save, SquarePen, User } from "lucide-react";
import Swal from "sweetalert2";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

function Perfil() {
  const { logout } = useAuth();
  const { request } = useApi();
  const navigate = useNavigate();
  const { accessToken, refreshToken, refreshAccessToken } = useAuth();

  const [user, setUser] = useState();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [original, setOriginal] = useState({});

  function logoutLocal() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      if (accessToken || refreshToken) {
        const response = await request(`/api/user`);
        setUser(response.data);
        setForm({
          name: response.data.name || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          birthdate: response.data.birthdate
            ? response.data.birthdate.split("T")[0]
            : "",
          role: response.data.role || "",
        });

        setLoading(false);
      } else {
        await refreshAccessToken();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la información del usuario",
      });
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        timer: 2000,
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
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Cargando perfil...
      </div>
    );
  }
  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl">
        Cargando perfil...
      </div>
    );
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
            />

            <FormInput
              labelText="Apellido"
              inputType="text"
              value={form.lastName}
              onChangeFn={handleChange}
              name="lastName"
              disabled={!editMode}
            />

            <FormInput
              labelText="Email"
              inputType="email"
              value={form.email}
              onChangeFn={handleChange}
              name="email"
              disabled={!editMode}
            />

            <FormInput
              labelText="Fecha de nacimiento"
              inputType="date"
              value={form.birthdate}
              onChangeFn={handleChange}
              name="birthdate"
              disabled={!editMode}
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
              onClick={handleSubmit}
              className="flex-1 bg-green-600 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
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
