import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
function DashboardButton({ isAdmin }) {
  if (isAdmin) {
    return (
      <Link to={"/dashboard"} className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md flex items-center">
        <Lock size={18} className="inline-block mr-1"/>
        <span>Dashboard</span>
      </Link>
    );
  }
  return <></>;
}

export default DashboardButton;
