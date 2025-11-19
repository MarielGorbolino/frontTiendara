import { Link } from "react-router-dom";

function Icon() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-bold text-rose-400">TienDara</span>
    </Link>
  );
}

export default Icon;