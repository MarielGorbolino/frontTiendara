import ProductCard from "./ProductCard";
function ProductList({ products }) {
  return (
    <div className="bg-gray-700 min-h-screen pt-16 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-emerald-400 text-center text-3xl mb-2 font-bold">Productos</h1>
        <p className="text-gray-300 text-center mb-8">{products[0].category}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
