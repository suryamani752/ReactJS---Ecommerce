import { useContext } from "react";
import { ShoppingCartContext } from "../context";

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

export default FilterSidebar;
