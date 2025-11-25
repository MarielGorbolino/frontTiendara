import { LogOut,LogIn,UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function AuthButtons({ isLogin,logOut }) {
  const navigate = useNavigate()

  function logoutLocal(){
    logOut()
    navigate("/")
  }

  if (isLogin) {
  return (
      <button
        onClick={logoutLocal}
        className={"flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm bg-gray-700 hover:bg-gray-600"}
      >
        <LogOut size={18} />
        <span>Log Out</span>
      </button>
    );
  }
  return (
    <>
      <Link to={"/login"} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center w-25">
        <LogIn size={18} />
        <span className="pl-2">Login</span>
      </Link>
      <Link to={"/register"} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center w-30">
        <UserRoundPlus size={18} />
        <span className="pl-2">Register</span>
      </Link>
    </>
  );
}

export default AuthButtons;
