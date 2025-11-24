import CategoryItem from "../components/CategoryItem";
import useCategories from "../hooks/useCategories";
function Categorys() {
  const {categories,isLoading,error} = useCategories()

  if (isLoading) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16">
        <div className="relative z-10 mx-auto max-w-7xl mb-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
            <p className="text-blue-400 text-xl">Cargando categorías...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16">
        <div className="relative z-10 mx-auto max-w-7xl mb-8 flex justify-center items-center">
          <div className="text-center">
            <p className="text-blue-400 text-xl mb-4">Error al cargar categorías:</p>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
      <div className="relative z-10 mx-auto max-w-7xl mb-8">
        <h1 className="text-blue-400 text-center text-5xl font-bold mb-4"> Categorias </h1>
        <p className="text-center text-xl text-gray-300 mb-12">Encontraras de todo tipo de cosas. </p>
        
        {categories.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 text-xl">No hay categorías disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorys;
