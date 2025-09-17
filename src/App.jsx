import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductLists from "./components/ProductList";
import ProductDetail from "./components/productDetail";
import Cart from "./components/cart";


function App() {
  return (
    <>
      <Header /> {/* Renders on all pages */}
      <main className="py-8">
        <Routes>
          <Route path="/" element={<ProductLists />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
