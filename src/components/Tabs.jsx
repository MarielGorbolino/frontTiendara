import { PlusCircle,ShoppingBasket } from "lucide-react"


const tabs =[
    {
        id:1,
        label:"Crear Producto",
        icon:PlusCircle
    },{
        id:2,
        label:"Lista de Productos",
        icon:ShoppingBasket
    },
    {
        id:3,
        label:"Crear Categoria",
        icon:PlusCircle
    }
]

function Tabs({activeTab, setActiveTab}) {
    
    return <div className="flex justify-center ">
        {
            tabs.map((tab)=>(
                <button key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`flex items-center px-4 py-2 mx-2 rounded-md ${activeTab === tab.id ? "bg-emerald-400": "bg-gray-300" }`}>{tab.label}</button>
            ))
        }
    </div>
}

export default Tabs