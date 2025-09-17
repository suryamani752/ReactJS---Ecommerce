import React, { useContext } from "react";
import { ShoppingCartContext } from "../context";
import { useNavigate } from "react-router-dom";

const CartItem = ({ singleCartItem }) => {
  const { handleRemoveFromCart, handleAddToCart } =
    useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div
        onClick={() => navigate(`/product-detail/${singleCartItem?.id}`)}
        className="w-24 h-24 flex shrink-0 bg-gray-100 rounded-md cursor-pointer"
      >
        <img
          src={singleCartItem?.thumbnail}
          alt={singleCartItem?.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-base font-bold text-gray-900">
          {singleCartItem?.title}
        </h3>
        <p className="text-lg font-bold text-gray-900 mt-1">
          ${singleCartItem?.totalPrice.toFixed(2)}
        </p>
        <button
          onClick={() => handleRemoveFromCart(singleCartItem, true)}
          className="text-red-500 hover:text-red-700 text-sm font-medium mt-2 cursor-pointer"
        >
          Remove
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleRemoveFromCart(singleCartItem, false)}
          disabled={singleCartItem?.quantity === 1}
          className="w-8 h-8 rounded-full border cursor-pointer border-gray-300 disabled:opacity-50 hover: bg-gray-100 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="font-bold text-lg w-8 text-center">
          {singleCartItem?.quantity}
        </span>
        <button
          onClick={() => handleAddToCart(singleCartItem)}
          className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover: bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
