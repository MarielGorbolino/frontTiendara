import { BadgeCheck,BadgeAlert,Trash,Eye,EyeOff,SquarePen } from "lucide-react"
import useProducts from "../hooks/useProducts"


function TableProductList() {
    const {products,isLoading,error} = useProducts()
    console.log(products)

    if(isLoading) {
        return (<div>cargando...</div>)
    }

    if(error) {
        return (<div>error:{error}</div>)
    }

    return <div className="text-white mt-5 p-4">
        <table>
            <thead  className="table-auto border border-gray-600 text-left w-full">
                <tr className="bg-gray-800"> 
                    <th className="border border-gray-600 px-2 py-1">Product</th>
                    <th className="border border-gray-600 w-1/6 px-2 py-1">Price</th>
                    <th className="border border-gray-600 w-1/6 px-2 py-1">Category</th>
                    <th className="border border-gray-600 w-1/6 px-2 py-1">State</th>
                    <th className="border border-gray-600 w-1/6 px-2 py-1">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                    <tr>
                        <td className="border border-gray-600 w-1/2 px-2 py-1">{product?.name}</td>
                        <td className="border border-gray-600 w-1/6 px-2 py-1">{product?.price}</td>
                        <td className="border border-gray-600 w-1/6 px-2 py-1">{product?.categoryId?.name}</td>
                        <td className="border border-gray-600 w-1/6 px-2 py-1">{product?.name ? <BadgeCheck size={18}/> : <BadgeAlert size={18}/>}</td>
                        <td className="border border-gray-600 w-1/6 px-2 py-1">
                            <button><Trash size={18}/></button>
                            <button><EyeOff size={18}/></button>
                            <button><SquarePen size={18}/></button>
                        </td>
                    </tr>  
                ))}
            </tbody>
        </table>
    </div>
}

export default TableProductList