import React, { useContext } from "react";
import { ShoppingCartContext } from "../context";
import Loader from "./Loader";
import SingleProduct from "./singleProduct";

const FilterSidebar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    brands,
    selectedBrands,
    handleBrandChange,
    maxPrice,
    priceLimit,
    setPriceLimit,
    clearFilters,
  } = useContext(ShoppingCartContext);

  return (
    <aside className="lg:h-screen lg:sticky top-24 col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Category</h4>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-md capitalize cursor-pointer"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug} className="capitalize">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto cursor-pointer">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="rounded"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="text-center text-sm text-gray-600 mt-1">
          Up to: <span className="font-bold">${priceLimit}</span>
        </div>
      </div>
    </aside>
  );
};

const ProductLists = () => {
  const { loading, filteredProducts, searchQuery, setSearchQuery } =
    useContext(ShoppingCartContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header and Search */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Featured Products
          </h2>
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full text-xl rounded-md p-6 border-gray-300 pl-10 focus:border-black focus:ring-black sm:text-sm shadow-sm"
                placeholder="Search by title and tags...."
              />
            </div>
          </div>
        </div>

        {/* Main Content: Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar />

          {/* Products Grid */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((singleProduct) => (
                  <SingleProduct
                    singleProduct={singleProduct}
                    key={singleProduct?.id}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl text-gray-700">No Products Found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductLists;
