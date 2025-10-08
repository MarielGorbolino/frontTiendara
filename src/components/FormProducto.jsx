import { useNavigate } from "react-router-dom"
import FormInput from "./FormInput"
import { useState } from "react"
import { PencilLine, DollarSign, Box, ImageUp} from "lucide-react"
import useCategories from "../hooks/useCategories";

function FormProducto(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        image:"",
        price:"",
        category:"",
        stock:"",
        id:"",
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

    async function saveProduct(e){
        e.preventDefault();
        console.log(formData)
        const respuesta = await fetch("http://localhost:3002/api/products",{
          method:"POST",
          body:JSON.stringify({
            name:formData.name,
            description:formData.description,
            image:formData.image,
            price:formData.price,
            stock:formData.stock,
            categoryId:formData.category
          }),
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await respuesta.json()
        console.log(data)
    }
    const {categories} = useCategories()

    return (
    <form
          onSubmit={saveProduct}
          className="space-y-5 flex flex-col justify-center px-8 pb-8"
        >
          <FormInput
            icon={<PencilLine size={18} />}
            labelText={"Nombre"}
            inputType={"text"}
            placeholder={"Mens Casual Slim Fit"}
            value={formData.name}
            onChangeFn={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <FormInput
            icon={<PencilLine size={18} />}
            labelText={"Description"}
            inputType={"text"}
            placeholder={"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side ..."}
            value={formData.description}
            onChangeFn={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <FormInput
            icon={<DollarSign size={18} />}
            labelText={"Precio"}
            inputType={"number"}
            placeholder={"19.99"}
            value={formData.price}
            onChangeFn={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

           <FormInput
            icon={<Box size={18} />}
            labelText={"Cantidad"}
            inputType={"number"}
            placeholder={"1"}
            value={formData.stock}
            onChangeFn={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
          <div className="flex flex-row  text-gray-300  justify-start items-center gap-2 mb-2">
            <Box size={18} /><label className="text-sm font-medium ">Categoria</label>
          </div>
            <select 
                name="category" 
                id="category" 
                value={formData.category} onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                }
                className="bg-gray-700 w-full px-6 py-3 text-white rounded-md p-2"
            >
                <option value="">Select category</option>
                {
                    categories.map((category)=>(
                        <option value={category._id} key={category._id}>{category.name}</option>
                    ))
                }
            </select>

            
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

export default FormProducto