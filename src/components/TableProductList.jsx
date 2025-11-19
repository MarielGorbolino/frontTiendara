import { BadgeCheck, BadgeAlert, Trash, EyeOff, SquarePen } from "lucide-react";
import useProducts from "../hooks/useProducts";

function TableProductList() {
const { products, isLoading, error, deleteProduct } = useProducts();


  if (isLoading) return <div className="text-white">Cargando...</div>;
  if (error) return <div className="text-blue-400">Error: {error}</div>;

  return (
    <div className="text-white p-4">
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-left">
          <tr>
            <th className="px-4 py-3 border-b border-gray-700">Producto</th>
            <th className="px-4 py-3 border-b border-gray-700">Precio</th>
            <th className="px-4 py-3 border-b border-gray-700">Categoría</th>
            <th className="px-4 py-3 border-b border-gray-700">Descipcion</th>
            <th className="px-4 py-3 border-b border-gray-700">Estado</th>
            <th className="px-4 py-3 border-b border-gray-700">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-800 transition-colors"
            >
              <td className="px-4 py-3 border-b border-gray-700">
                {product?.title}
              </td>
              <td className="px-4 py-3 border-b border-gray-700">
                ${product?.price}
              </td>
              <td className="px-4 py-3 border-b border-gray-700">
                {product?.category?.name}
              </td>
               <td className="px-4 py-3 border-b border-gray-700">
                {product?.desciption}
              </td>
              <td className="px-4 py-3 border-b border-gray-700">
                {product?.stock > 0 ? (
                  <BadgeCheck size={18} className="text-blue-400" />
                ) : (
                  <BadgeAlert size={18} className="text-blue-400" />
                )}
              </td>
              <td className="px-4 py-3 border-b border-gray-700 flex gap-3">
                <button className="hover:text-blue-400 transition" onClick={() => deleteProduct(product._id)}>
                  <Trash size={18} />
                </button>
                <button className="hover:text-yellow-400 transition">
                  <EyeOff size={18} />
                </button>
                <button className="hover:text-blue-400 transition">
                  <SquarePen size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProductList;
