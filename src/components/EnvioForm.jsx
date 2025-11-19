import FormInput from "./FormInput"
import { PencilLine } from "lucide-react"
const EnvioForm = ({shippingInfo,handleShippingChange}) => {
    return <div>
        <form action="">
            <div>
                <FormInput name="name" labelText={"Nombre Completo"} inputType={"text"} placeholder={"Nombre ..."} value={shippingInfo.name} onChangeFn={handleShippingChange} isRequired ={true} icon={<PencilLine size={18} />}></FormInput>
                <FormInput name="email" labelText={"Email"} inputType={"email"} placeholder={"algo@gmail.com"} value={shippingInfo.email} onChangeFn={handleShippingChange} isRequired ={true} icon={<PencilLine size={18} />}></FormInput>
                <FormInput name="address" labelText={"Direccion"} inputType={"text"} placeholder={"calle falsa 123"} value={shippingInfo.address} onChangeFn={handleShippingChange} isRequired ={true} icon={<PencilLine size={18} />}></FormInput>
                <FormInput name="city" labelText={"ciudad"} inputType={"text"} placeholder={""} value={shippingInfo.city} onChangeFn={(e)=>{handleShippingChange(e)}} isRequired ={true} icon={<PencilLine size={18} />}></FormInput>
            </div>
        </form>
    </div>
}

export default EnvioForm