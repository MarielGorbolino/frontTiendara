import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function SmartBackButton({ fallback = "/" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate(fallback);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
    >
      <ArrowLeft size={18} />
      Volver
    </button>
  );
}

export default SmartBackButton;
