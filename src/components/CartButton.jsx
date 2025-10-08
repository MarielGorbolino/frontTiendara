import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import useCart from "../hooks/useCart"

function CartButton ({isLogin}){
    const {getTotalItems,cart} = useCart();
    console.log(cart)
    if(isLogin){
        return(<Link to={"/cart"} className="relative text-gray-300 hover:text-emerald-400">
            <ShoppingCart size={18} className="inline-block mr-1"/>
            <span>Cart</span>
            {
                getTotalItems()>= 0 && (
                    <span className="absolute -top-2 -left-2 bg-emerald-700 text-white rounded-full px-2 py-0.5 text-xs">{getTotalItems()}</span>
                )
            }
            
        </Link>)
    }
    return(<></>)
}

export default CartButton