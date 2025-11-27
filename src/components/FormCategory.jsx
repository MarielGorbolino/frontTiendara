import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";
import { PencilLine, ImageUp } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

function FormCategory() {
  const navigate = useNavigate();
  const { refreshAccessToken, logout, accessToken } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_URL_BACK;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function navigateToHome() {
    navigate(-1);
  }

  function validateField(name, value) {
    let errorMsg = "";

    if (name === "name" && value !== "" && value.trim().length < 3) {
      errorMsg = "El título debe tener al menos 3 caracteres";
    }

    if (name === "description" && value !== "" && value.trim().length < 5) {
      errorMsg = "La descripción debe tener al menos 5 caracteres";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 1;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      alert(`La imagen supera el tamaño máximo de ${maxSizeMB} MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      setFormData((prev) => ({
        ...prev,
        image: base64,
      }));

      e.target.value = null;
    };

    reader.readAsDataURL(file);
  }

  async function saveCategory(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let tokenToUse = accessToken;
      let respuesta = await fetch(`${apiBaseUrl}/api/category`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          authorization: `${tokenToUse}`,
        },
      });

      if (respuesta.status === 401) {
        const refreshResult = await refreshAccessToken();

        if (!refreshResult || !refreshResult.accessToken) {
          logout();
          navigate("/login");
          setIsSubmitting(false);
          return;
        }

        tokenToUse = refreshResult.accessToken;

        respuesta = await fetch(`${apiBaseUrl}/api/category`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            authorization: `${tokenToUse}`,
          },
        });

        if (respuesta.status === 401) {
          logout();
          navigate("/login");
          setIsSubmitting(false);
          return;
        }
      }

      if (!respuesta.ok) {
        setIsSubmitting(false);
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      await respuesta.json();

      setFormData({
        name: "",
        description: "",
        image: "",
      });

      setIsSubmitting(false);

      Swal.fire({
        icon: "success",
        text: "Categoría guardada correctamente",
      });
    } catch (error) {
      setIsSubmitting(false);
      setFormData({
        name: "",
        description: "",
        image: "",
      });

      Swal.fire({
        icon: "error",
        text: "Error al crear categoría",
      });
    }
  }

  function hasErrors() {
     const errorEmpty =
      !formData.name ||
      !formData.description ||
      formData.image?.length == 0
      
    return errorEmpty || errors && Object.values(errors).some((err) => err && err.length > 0);
  }


  return (
    <form
      onSubmit={saveCategory}
      className="space-y-5 flex flex-col justify-center px-8 pb-8"
    >
      <FormInput
        icon={<PencilLine size={18} />}
        labelText={"Nombre *"}
        inputType={"text"}
        placeholder={"Electronics"}
        value={formData.name}
        onChangeFn={(e) => {
          setFormData({ ...formData, name: e.target.value });
          validateField("name", e.target.value);
        }}
        error={errors.name}
      />

      <FormInput
        icon={<PencilLine size={18} />}
        labelText={"Descripción *"}
        inputType={"text"}
        placeholder={"49 INCH SUPER ULT..."}
        value={formData.description}
        onChangeFn={(e) => {
          setFormData({ ...formData, description: e.target.value });
          validateField("description", e.target.value);
        }}
        error={errors.description}
      />

      <FormInput
        icon={<ImageUp size={18} />}
        labelText={"Imagen *"}
        inputType={"file"}
        isRequired={false}
        onChangeFn={handleImageChange}
      />

      {formData.image && (
        <img
          src={formData.image}
          className="w-32 h-32 object-cover rounded-md mx-auto border border-gray-600"
        />
      )}

      <div className="flex flex-row justify-center gap-4 pt-6">
        <button
          onClick={navigateToHome}
          type="button"
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center"
        >
          Volver
        </button>

        <button
          type="submit"
          disabled={isSubmitting  || hasErrors()}
          className={`px-6 py-3 rounded-md flex items-center justify-center flex-1 text-center text-white
            ${
              isSubmitting  || hasErrors()
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-emerald-700 hover:bg-emerald-600"
            }`}
        >
           {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}

export default FormCategory;
