import ProductList from "./ProductoList";
import Paginado from "./Paginado";
import Loading from "./Loading";

export default function ProductsPage({ productsData }) {
  const {
    products,
    loading,
    showMessage,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    searchInput,
    setSearchInput,
    handleSearchSubmit,
    isCategoryPage = false,
    category = "",
  } = productsData;

  return (
    <div className="min-h-screen bg-gray-700 pt-20 px-4 pb-10">
      <div className="w-full">
        <h1 className="text-blue-400 text-center text-3xl mb-2 font-bold">
          Productos
        </h1>
        <p className="text-gray-300 text-center mb-8">
          {isCategoryPage ? `Los mejores productos que encontrarás en la categoría ${category}` : "Encontrarás de todo tipo de cosas."}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex w-full md:w-1/3">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 text-white bg-gray-900 rounded-l border border-gray-600 w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-green-900 text-white rounded-r"
          >
            Buscar
          </button>
        </div>

        <select
          className="px-3 py-2 text-white bg-gray-900 rounded border border-gray-600 w-full md:w-1/4"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio (menor a mayor)</option>
          <option value="price-desc">Precio (mayor a menor)</option>
          <option value="name-asc">Nombre (A → Z)</option>
          <option value="name-desc">Nombre (Z → A)</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <>
          <ProductList products={products} isCategoryPage={isCategoryPage} />
          <Paginado page={page} totalPages={totalPages} setPage={setPage} />
        </>
      ) : showMessage ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="bg-gray-800 border border-gray-700 text-gray-200 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <span className="text-lg">No hay productos.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
