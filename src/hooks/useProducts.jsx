import { useState,useEffect } from "react"

function useProducts(){
    const [products,setProducts] =useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error,setError] = useState(null)

    async function fetchProducts() {
        try{
            const response = await fetch("http://localhost:3002/api/products")
            if(!response.ok){
                throw new Error("Error en la peticion")
            }
            const data = await response.json()
            setProducts(data.data)
        }catch (error){
            setError(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])

    return {products,isLoading,error}
}

export default useProducts