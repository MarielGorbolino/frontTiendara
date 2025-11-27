import { Trash, SquarePen, Save, Ban, Eye, PencilLine } from "lucide-react";
import useProducts from "../hooks/useProducts";
import { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import Swal from "sweetalert2";

function TableProductList() {
  const { products, isLoading, error, deleteProduct, updateParcialProduct } =
    useProducts();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    let error = "";

    if (name === "title" && value !== "" && value.trim().length < 3) {
      error = "El título debe tener al menos 3 caracteres";
    }

    if (name === "description" && value !== "" && value.trim().length < 5) {
      error = "La descripción debe tener al menos 5 caracteres";
    }

    if (name === "price" && (value === "" || Number(value) <= 0)) {
      error = "El precio debe ser mayor a 0";
    }

    if (name === "stock" && (value === "" || Number(value) < 0)) {
      error = "El stock debe ser mayor o igual 0";
    }

    return error;
  }

  function hasErrors() {
    const errorEmpty =
      !editValues.title ||
      !editValues.description ||
      !editValues.price ||
      !editValues.stock;

    return (
      errorEmpty ||
      (errors && Object.values(errors).some((err) => err && err.length > 0))
    );
  }

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
                  <FormInput
                    inputType={"text"}
                    value={editValues.title}
                    name="title"
                    onChangeFn={handleChange}
                    error={errors.title}
                  />
                ) : (
                  product.title
                )}
              </td>
              <td className="px-4 py-3">
                {editingId === product._id ? (
                  <FormInput
                    inputType={"text"}
                    value={editValues.price}
                    name="price"
                    onChangeFn={handleChange}
                    error={errors.price}
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
                  <FormInput
                    inputType={"text"}
                    value={editValues.description}
                    name="description"
                    onChangeFn={handleChange}
                    error={errors.description}
                  />
                ) : (
                  product.description || "-"
                )}
              </td>
              <td className="px-4 py-3">
                {editingId === product._id ? (
                  <FormInput
                    inputType={"text"}
                    value={editValues.stock}
                    name="stock"
                    onChangeFn={handleChange}
                    error={errors.stock}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="px-4 py-3 flex gap-10">
                {editingId === product._id ? (
                  <>
                    <button
                      className="text-red-400 hover:text-red-600 transition mt-4"
                      onClick={() => {
                        setEditingId(null);
                        setEditValues({});
                      }}
                    >
                      <Ban size={30} />
                    </button>
                    <button
                      className="text-green-400 hover:text-green-600 transition mt-4"
                      onClick={() => {
                        if (!hasErrors()) {
                          updateParcialProduct(editingId, editValues);
                          setEditingId(null);
                        }else{
                           Swal.fire({
                                    icon: "error",
                                    text: `Por favor corrija los errores antes de guardar`,
                                  });
                        }
                      }}
                    >
                      <Save size={30} />
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
                      <SquarePen size={20} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600 transition"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash size={20} />
                    </button>
                    <button
                      className="text-green-400 hover:green-red-600 transition"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <Eye size={20} />
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
