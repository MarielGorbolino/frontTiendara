import CategoryItem from "../components/CategoryItem";
import useCategories from "../hooks/useCategories";
function Categorys() {
  const {categories,isLoading,error} = useCategories()

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gray-700 pt-16 ">
      <div className="relative z-10 mx-auto max-w-7xl mb-8">
        <h1 className="text-emerald-400 text-center text-5xl font-bold mb-4"> Categories</h1>
        <p className="text-center text-xl text-gray-300 mb-12">Discover the latest trends</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categorys;
