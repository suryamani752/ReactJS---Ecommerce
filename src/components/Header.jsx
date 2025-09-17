import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";

const Header = () => {
  const { lengthOfCartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              CodeYodha-shop
            </Link>
          </div>
          {/* CART ICON */}
          <div className="ml-4 flow-root lg:ml-6">
            <button
              onClick={() => navigate("/cart")}
              className="group -m-2 p-2 flex items-center relative"
            >
              <i className="ri-shopping-cart-2-fill text-2xl text-gray-600 group-hover:text-gray-800 group-hover:cursor-pointer"></i>
              {lengthOfCartItems > 0 && (
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {lengthOfCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
