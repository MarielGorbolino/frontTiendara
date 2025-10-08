import { useNavigate } from "react-router-dom"
import FormInput from "./FormInput"
import { useState } from "react"
import { PencilLine,DollarSign, ImageUp } from "lucide-react"

function FormCategory(){
    const navigate = useNavigate()
    //const [imgb64,setImgb64] = useState("")
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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                setFormData({ ...formData, image: base64 });
            };
            reader.readAsDataURL(file);
        }
    }

    async function saveCategory(e){
        e.preventDefault();
        const respuesta = await fetch("http://localhost:3001/api/category",{
          method:"POST",
          body:JSON.stringify(formData),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await respuesta.json()
        console.log(data)
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