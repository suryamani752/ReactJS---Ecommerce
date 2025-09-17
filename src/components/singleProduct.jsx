import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";

const SingleProduct = ({ singleProduct }) => {
  const { cartItems, handleAddToCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const isItemInCart =
    singleProduct &&
    cartItems.findIndex((item) => item.id === singleProduct.id) > -1;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <div
        onClick={() => navigate(`/product-detail/${singleProduct?.id}`)}
        className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-60 cursor-pointer"
      >
        <img
          src={singleProduct?.thumbnail}
          alt={singleProduct?.title}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          <a
            onClick={() => navigate(`/product-detail/${singleProduct?.id}`)}
            className="cursor-pointer"
          >
            {singleProduct?.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500 capitalize">
          {singleProduct?.category}
        </p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-semibold text-gray-900">
            ${singleProduct?.price}
          </p>
        </div>
        <button
          onClick={
            isItemInCart
              ? () => navigate("/cart")
              : () => handleAddToCart(singleProduct)
          }
          className={`mt-2 w-full rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer ${
            isItemInCart
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-black hover:bg-gray-800"
          } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
        >
          {isItemInCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
