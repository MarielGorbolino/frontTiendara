import { Trash, SquarePen, Save, Ban, Eye } from "lucide-react";
import useProducts from "../hooks/useProducts";
import { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function TableProductList() {
  const { products, isLoading, error, deleteProduct, updateParcialProduct } =
    useProducts();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleChange = (field, value) => {
    setEditValues({ ...editValues, [field]: value });
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-red-500 font-semibold p-4">
        Error al cargar productos: {error}
      </div>
    );

  return (
    <div className="p-4">
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden text-white table-fixed">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-3 border-b border-gray-700 w-1/4 text-left">
              Producto
            </th>
            <th className="px-4 py-3 border-b border-gray-700 w-1/12 text-left">
              Precio
            </th>
            <th className="px-4 py-3 border-b border-gray-700 w-1/6 text-left">
              Categoría
            </th>
            <th className="px-4 py-3 border-b border-gray-700 w-1/3 text-left">
              Descripción
            </th>
            <th className="px-4 py-3 border-b border-gray-700 w-1/12 text-left">
              Stock
            </th>
            <th className="px-4 py-3 border-b border-gray-700 w-1/6 text-left">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-3 truncate max-w-[150px]">
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full text-white"
                    value={editValues.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                ) : (
                  product.title
                )}
              </td>
              <td className="px-4 py-3">
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full text-white"
                    value={editValues.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="px-4 py-3 truncate">
                {product?.category?.name || "-"}
              </td>
              <td className="px-4 py-3 truncate max-w-[200px]">
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full text-white"
                    value={editValues.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                ) : (
                  product.description || "-"
                )}
              </td>
              <td className="px-4 py-3">
                {editingId === product._id ? (
                  <input
                    className="bg-gray-700 p-1 rounded w-full text-white"
                    value={editValues.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-3 flex gap-10">
                {editingId === product._id ? (
                  <>
                    <button
                      className="text-red-400 hover:text-red-600 transition"
                      onClick={() => {
                        setEditingId(null);
                        setEditValues({});
                      }}
                    >
                      <Ban size={18} />
                    </button>
                    <button
                      className="text-green-400 hover:text-green-600 transition"
                      onClick={() => {
                        updateParcialProduct(editingId, editValues);
                        setEditingId(null);
                      }}
                    >
                      <Save size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-blue-400 hover:text-blue-600 transition"
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
                    <button
                      className="text-red-400 hover:text-red-600 transition"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash size={18} />
                    </button>
                    <button
                      className="text-green-400 hover:green-red-600 transition"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <Eye size={18} />
                    </button>
                  </>
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
