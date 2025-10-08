import { PlusCircle,ShoppingBasket } from "lucide-react"


const tabs =[
    {
        id:1,
        label:"Create Product",
        icon:PlusCircle
    },{
        id:2,
        label:"Product List",
        icon:ShoppingBasket
    },
    {
        id:3,
        label:"Create Category",
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