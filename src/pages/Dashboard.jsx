import Tabs from "../components/Tabs"
import { useState } from "react"
import FormProducto from "../components/FormProducto"
import TableProductList from "../components/TableProductList"
import FormCategory from "../components/FormCategory"

function Dashboard (){
    const [activeTab, setActiveTab] = useState(1)

    return (
        <div className="flex justify-center bg-gray-700 min-h-screen pt-16 px-4">
            <div className="bg-gray-900 rounded-2xl w-full max-w-6xl py-4">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === 1 && <FormProducto />}
                {activeTab === 2 && <TableProductList />}
                {activeTab === 3 && <FormCategory />}
                {activeTab === 4 && <h1 className="text-white">Tab no encontrado</h1>}
            </div>
        </div>
    )
}

export default Dashboard
