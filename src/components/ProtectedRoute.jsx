import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
function ProtectedRoute({children,requereAdmin = false}){
    const {user, isAuthenticated, isLoading} = useAuth()

    if(isLoading){
        return <div>cargando...</div> 
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(requereAdmin && user.role !=="admin"){
        return <Navigate to="/" replace/>
    }

    return children
}

export default ProtectedRoute