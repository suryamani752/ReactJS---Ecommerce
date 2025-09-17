// src/context/index.jsx
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceLimit, setPriceLimit] = useState(0);
  const [productDetail, setProductDetail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [lengthOfCartItems, setLengthOfCartItems] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function fetchInitialData() {
    try {
      setLoading(true);
      const productResponse = await fetch(
        "https://dummyjson.com/products?limit=100"
      );
      const productResult = await productResponse.json();
      const products = productResult.products;
      setListOfProducts(products);

      const categoryResponse = await fetch(
        "https://dummyjson.com/products/categories"
      );
      const categoryResult = await categoryResponse.json();
      setCategories(categoryResult);

      const uniqueBrands = [...new Set(products.map((p) => p.brand))];
      const maxProductPrice = Math.max(...products.map((p) => p.price));
      setBrands(uniqueBrands);
      setMaxPrice(maxProductPrice);
      setPriceLimit(maxProductPrice);
    } catch (error) {
      setError("Unable to fetch initial data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialData();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);

  useEffect(() => {
    let tempProducts = listOfProducts;
    if (selectedCategory)
      tempProducts = tempProducts.filter(
        (p) => p.category === selectedCategory
      );
    if (selectedBrands.length > 0)
      tempProducts = tempProducts.filter((p) =>
        selectedBrands.includes(p.brand)
      );
    if (priceLimit < maxPrice)
      tempProducts = tempProducts.filter((p) => p.price <= priceLimit);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tempProducts = tempProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    setFilteredProducts(tempProducts);
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    priceLimit,
    listOfProducts,
    maxPrice,
  ]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((p) =>
      p.includes(brand) ? p.filter((b) => b !== brand) : [...p, brand]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceLimit(maxPrice);
  };

  useEffect(() => {
    setLengthOfCartItems(cartItems?.length);
  }, [cartItems]);

  function handleAddToCart(getProductDetail) {
    let copyCart = [...cartItems];
    const itemIndex = copyCart.findIndex(
      (item) => item.id === getProductDetail.id
    );
    if (itemIndex === -1) {
      copyCart.push({
        ...getProductDetail,
        quantity: 1,
        totalPrice: getProductDetail.price,
      });
      toast.success(`${getProductDetail.title} added to cart!`);
    } else {
      copyCart[itemIndex].quantity += 1;
      copyCart[itemIndex].totalPrice =
        copyCart[itemIndex].quantity * copyCart[itemIndex].price;
      toast.success(`Quantity updated for ${getProductDetail.title}!`);
    }
    setCartItems(copyCart);
    localStorage.setItem("cartItems", JSON.stringify(copyCart));
  }

  function handleRemoveFromCart(getProductDetail, isFullRemove) {
    let copyCart = [...cartItems];
    const itemIndex = copyCart.findIndex(
      (item) => item.id === getProductDetail.id
    );
    if (isFullRemove || copyCart[itemIndex].quantity === 1) {
      copyCart.splice(itemIndex, 1);
      toast.success(`${getProductDetail.title} removed from cart.`);
    } else {
      copyCart[itemIndex].quantity -= 1;
      copyCart[itemIndex].totalPrice =
        copyCart[itemIndex].quantity * copyCart[itemIndex].price;
    }
    setCartItems(copyCart);
    localStorage.setItem("cartItems", JSON.stringify(copyCart));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        filteredProducts,
        searchQuery,
        setSearchQuery,
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
        listOfProducts,
        error,
        productDetail,
        setProductDetail,
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        lengthOfCartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
