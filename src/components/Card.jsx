import React from "react";

const Card = ({ singleProduct }) => {
  return (
    <>
      <div className="border cursor-pointer border-fuchsia-600 hover:border-fuchsia-800 p-6 m-2">
        <div>
          <img src={singleProduct?.thumbnail} alt={singleProduct.title} />
        </div>
        <div>
          <div className="font-bold">
            <h2 className="text-center">{singleProduct.title}</h2>
          </div>
          <div className="flex justify-between">
            <p className="text-xl font-bold">$ {singleProduct.price}</p>
            <p
              className={`text-xl ${
                singleProduct.stock > 50 ? "text-green-500" : "text-red-500"
              }`}
            >
              stocks: {singleProduct.stock}
            </p>
          </div>
        </div>
        <button className="bg-gray-600 p-6 rounded-lg text-gray-100 mt-2 w-full hover:bg-gray-800">
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default Card;
