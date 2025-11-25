import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
function ProtectedRoute({children,requereAdmin = false}){
    const {user, isAuthenticated, isLoading} = useAuth()

    if(isLoading){
        return (
        <div className="min-h-screen bg-gray-700 text-white pt-16 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-blue-400 text-xl">Cargando...</p>
        </div>
        </div>
        );
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