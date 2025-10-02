import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductLists from "./components/ProductList";
import ProductDetail from "./components/productDetail";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Header />
      <main className="py-8">
        <Routes>
          <Route path="/" element={<ProductLists />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
