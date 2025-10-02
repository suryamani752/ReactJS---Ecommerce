import React, { useContext } from "react";
import { ShoppingCartContext } from "../context";
import Loader from "./Loader";
import SingleProduct from "./singleProduct";
import FilterSidebar from "./FilterSidebar";

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
