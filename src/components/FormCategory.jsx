import { useNavigate } from "react-router-dom"
import FormInput from "./FormInput"
import { useState } from "react"
import { PencilLine,DollarSign, ImageUp } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import Swal from "sweetalert2"

function FormCategory(){
    const navigate = useNavigate()
      const { refreshAccessToken, logout, accessToken } = useAuth();
      const apiBaseUrl =
			import.meta.env.VITE_URL_BACK || "http://localhost:3008";

    const [formData, setFormData] = useState({
        name:"",
        description:"",
        image:"",
    })

    function navigateToHome(){
        navigate(-1)
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
                setFormData({ ...formData, image: base64 });
            };
            reader.readAsDataURL(file);
        
    }
  async function saveCategory(e) {
    e.preventDefault();

    try {
       const respuesta = await fetch(`${apiBaseUrl}/api/category`,{
          method:"POST",
          body:JSON.stringify(formData),
          headers:{
            "Content-Type":"application/json",
				      authorization: `${accessToken}`,

          }
        })

      if (respuesta.status === 401) {

        const refreshResult = await refreshAccessToken();

        if (refreshResult && refreshResult.accessToken) {
            const respuesta = await fetch(`${apiBaseUrl}/api/category`,{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
              "Content-Type":"application/json",
                authorization: `${refreshResult.accessToken}`,

            }
        })

          if (respuesta.status === 401) {
            logout();
            navigate("/login");
            return;
          }
        } else {
          logout();
          navigate("/login");
          return;
        }
      }

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      await respuesta.json();
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
        id: "",
      });
    } catch (error) {
      Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al crear producto:",
                  });
    }
  }

    return (
    <form
          onSubmit={saveCategory}
          className="space-y-5 flex flex-col justify-center px-8 pb-8"
        >
          <FormInput
            icon={<PencilLine size={18} />}
            labelText={"Name"}
            inputType={"text"}
            placeholder={"Electronics"}
            value={formData.name}
            onChangeFn={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <FormInput
            icon={<PencilLine size={18} />}
            labelText={"Description"}
            inputType={"text"}
            placeholder={"49 INCH SUPER ULT..."}
            value={formData.description}
            onChangeFn={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <FormInput
            icon={<ImageUp size={18} />}
            labelText={"Image"}
            inputType={"file"}
            value={formData.image}
            isRequired={false}
            onChangeFn={handleImageChange}
          />


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
    )
}

export default FormCategory