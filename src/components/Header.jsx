import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { lengthOfCartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("logout failed", error);
    }
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* brand name */}
            <Link to="/" className="text-2xl font-bold text-gray-900">
              CodeYodha-shop
            </Link>
          </div>
          {/* CART ICON */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/cart")}
              className="group -m-2 p-2 flex items-center relative cursor-pointer"
            >
              <i className="ri-shopping-cart-2-fill text-2xl text-gray-600"></i>
              {lengthOfCartItems > 0 && (
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {lengthOfCartItems}
                </span>
              )}
            </button>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer"
                >
                  <img
                    src={
                      currentUser.photoURL ||
                      `https://api.dicebear.com/8.x/initials/svg?seed=${currentUser.email}`
                    }
                    alt="Profile Pic"
                    className="w-9 h-9 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-semibold cursor-pointer text-gray-700 hover:text-black"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
