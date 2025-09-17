import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShoppingCartProvider from "./context/index.jsx";
import "remixicon/fonts/remixicon.css";
import { Toaster } from "react-hot-toast"; // NEW

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShoppingCartProvider>
      {/* Toaster component for notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </ShoppingCartProvider>
  </BrowserRouter>
);
