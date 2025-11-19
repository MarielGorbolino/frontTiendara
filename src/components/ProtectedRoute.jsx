import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
function ProtectedRoute({children,requereAdmin = false}){
    const {user, isAuthenticated, isLoading} = useAuth()

    if(isLoading){
        return <div>cargando...</div> 
    }

    //yo te dejo pasar si estas autenticado, sino te mando login
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    //si tenes el permiso te dejo pasar, sino te llevo al /
    if(requereAdmin && user.role !=="admin"){
        return <Navigate to="/" replace/>
    }

    return children
}

export default ProtectedRoute