import { useContext } from "react";
import { CartContext } from "./CartContext";
function useCart(){
  const context = useContext(CartContext)
  if(!context){
    console.log("contexto no definido")
    throw new Error("useCart debe ser usado dentro de su provider")
  }
  return context
}
export default useCart