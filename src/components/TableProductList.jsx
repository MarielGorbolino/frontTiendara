import {
  BadgeCheck,
  BadgeAlert,
  Trash,
  EyeOff,
  SquarePen,
  Save,
  Ban,
} from "lucide-react";
import useProducts from "../hooks/useProducts";
import { useState } from "react";

function TableProductList() {
  const { products, isLoading, error, deleteProduct, updateParcialProduct } =
    useProducts();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-700 text-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-blue-400 text-xl">Cargando...</p>
        </div>
      </div>
    );
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
            <th className="px-4 py-3 border-b border-gray-700">Stock</th>
            <th className="px-4 py-3 border-b border-gray-700">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-gray-800 transition-colors">
              <td>
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full"
                    value={editValues.title}
                    onChange={(e) =>
                      setEditValues({ ...editValues, title: e.target.value })
                    }
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full"
                    value={editValues.price}
                    onChange={(e) =>
                      setEditValues({ ...editValues, price: e.target.value })
                    }
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="px-4 py-3 border-b border-gray-700">
                {product?.category?.name}
              </td>
              <td>
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full"
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.description
                )}
              </td>

              <td>
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full"
                    value={editValues.stock}
                    onChange={(e) =>
                      setEditValues({ ...editValues, stock: e.target.value })
                    }
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-3 border-b border-gray-700 flex gap-3">
                {editingId === product._id ? (
                  <button
                    className="text-red-400 transition"
                    onClick={() => {
                      setEditingId(null);
                      setEditValues({});
                    }}
                  >
                    <Ban size={18} />
                  </button>
                ) : (
                  <button
                    className="text-red-400 transition"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Trash size={18} />
                  </button>
                )}

                {editingId === product._id ? (
                  <button
                    className="text-green-400 transition"
                    onClick={() => {
                      updateParcialProduct(editingId, editValues);
                      setEditingId(null);
                    }}
                  >
                    <Save size={18} />
                  </button>
                ) : (
                  <button
                    className="text-blue-400 transition"
                    onClick={() => {
                      setEditingId(product._id);
                      setEditValues({
                        title: product.title,
                        price: product.price,
                        category: product.category?._id,
                        description: product.description,
                        stock: product.stock,
                      });
                    }}
                  >
                    <SquarePen size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProductList;
