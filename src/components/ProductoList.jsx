import ProductCard from "./ProductCard";
function ProductList({ products }) {
  return (
    <div className="bg-gray-700 min-h-screen pt-4 px-4 pb-12">
      {" "}

        <div className="text-gray-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {products.map((product) => (
            <ProductCard product={product} key={product?._id} />
          ))}{" "}
      
      </div>{" "}
    </div>
  );
}
export default ProductList;
