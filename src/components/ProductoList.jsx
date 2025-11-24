import ProductCard from "./ProductCard";
function ProductList({ products }) {
  return (
<div className="bg-gray-700 min-h-screen pt-16 px-4 pb-12">
  <div className="w-full">
    <h1 className="text-blue-400 text-center text-3xl mb-2 font-bold">Productos</h1>
    <p className="text-gray-300 text-center mb-8">Los mejores productos que encontraras</p>

    <div className="text-gray-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard product={product} key={product?._id} />
      ))}
    </div>
  </div>
</div>
  );
}

export default ProductList;
