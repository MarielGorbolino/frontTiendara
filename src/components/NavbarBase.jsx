import { Link } from "react-router-dom"


function NavbarBase(){
    return <div>
        <Link to={"/"} className="text-gray-300 hover:text-emerald-400 px-4">Home</Link>
        <Link to={"/category"} className="text-gray-300 hover:text-emerald-400 px-4">Category</Link>
        <Link to={"/contact"} className="text-gray-300 hover:text-emerald-400 px-4">Contact</Link>
    </div>
}

export default NavbarBase