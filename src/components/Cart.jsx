import React, { useContext } from "react";
import {ShoppingCartContext } from "../context";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const totalAmount = cartItems.reduce(
    (initial, curr) => initial + curr.totalPrice,
    0
  );
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mt-4">
        My Cart
      </h1>
      {cartItems && cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((cartItem) => (
              <CartItem singleCartItem={cartItem} key={cartItem?.id} />
            ))}
          </div>
          <div className="bg-gray-50 rounded-lg p-6 h-max">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300">
              Order summary
            </h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                disabled={cartItems.length === 0}
                className="w-full rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 flex justify-center items-center flex-col min-h-[60vh]">
          <i className="ri-shopping-cart-2-fill text-6xl text-gray-300"></i>
          <h3 className="text-2xl font-semibold text-gray-700 mt-4">
            OOPS! Your Cart is empty. 😟
          </h3>
          <p className="text-gray-500 mt-2">
            Looks like you have not added anything 😣 to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-md bg-black px-5 py-3 text-sm text-white shadow-sm hover:bg-gray-800 cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
