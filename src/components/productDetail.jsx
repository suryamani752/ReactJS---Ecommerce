import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../context";
import Loader from "./Loader";
import ProductReview from "./ProductReview";
import SingleProduct from "./singleProduct";
import { useAuth } from "../context/AuthContext";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    } else if (i - 0.5 <= rating) {
      stars.push(<i key={i} className="ri-star-half-fill text-yellow-400"></i>);
    } else {
      stars.push(<i key={i} className="ri-star-line text-gray-300"></i>);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

const ProductDetail = () => {
  const { id } = useParams();
  const {
    productDetail,
    setProductDetail,
    cartItems,
    loading,
    setLoading,
    error,
    setError,
    handleAddToCart,
    listOfProducts,
  } = useContext(ShoppingCartContext);
  const { currentUser } = useAuth();

  const [mainImage, setMainImage] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const productFromList = listOfProducts.find(
      (product) => product.id === parseInt(id)
    );
    if (productFromList) {
      setProductDetail(productFromList);
      setMainImage(productFromList.thumbnail);
    } else {
      async function fetchProductDetails() {
        try {
          setLoading(true);
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProductDetail(data);
          setMainImage(data.thumbnail);
          setError(null);
        } catch (error) {
          setError("Unable to fetch the product details");
        } finally {
          setLoading(false);
        }
      }
      fetchProductDetails();
    }
  }, [id, listOfProducts, setProductDetail, setLoading, setError]);
  useEffect(() => {
    if (productDetail && listOfProducts.length > 0) {
      const filtered = listOfProducts
        .filter(
          (item) =>
            item.category === productDetail.category &&
            item.id !== productDetail.id
        )
        .slice(0, 4);
      setSimilarProducts(filtered);
    }
  }, [productDetail, listOfProducts]);

  if (loading || !productDetail) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>{error}</p>
      </div>
    );
  }

  const isItemInCart =
    cartItems.findIndex((item) => item.id === productDetail.id) > -1;

  const handleAddToCartClick = () => {
    if (currentUser) {
      handleAddToCart(productDetail);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex flex-col-reverse">
          <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
            <div className="grid grid-cols-5 gap-6">
              {productDetail?.images?.map((image) => (
                <button
                  key={image}
                  onClick={() => setMainImage(image)}
                  className={`relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                    mainImage === image ? "ring-black ring-2" : ""
                  }`}
                >
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={mainImage}
              alt={productDetail?.title}
              className="h-full w-full object-cover object-center rounded-lg shadow-sm"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {productDetail?.title}
          </h1>
          <div className="mt-3">
            <p className="text-3xl tracking-tight text-gray-900">
              ${productDetail?.price}
            </p>
          </div>
          <div className="mt-3 flex items-center">
            <p className="text-sm text-gray-600 mr-2">Rating:</p>
            <StarRating rating={productDetail?.rating} />
            <span className="ml-2 text-sm text-gray-500">
              ({productDetail?.rating.toFixed(1)})
            </span>
          </div>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              <p>{productDetail?.description}</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full capitalize">
              {productDetail?.brand}
            </span>
            <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full capitalize">
              {productDetail?.category}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Stock:{" "}
            <span className="text-green-600 font-bold">
              {productDetail?.stock} available
            </span>
          </p>
          <div className="mt-10">
            <button
              onClick={
                isItemInCart ? () => navigate("/cart") : handleAddToCartClick
              }
              className={`flex w-full items-center justify-center cursor-pointer rounded-md border border-transparent px-8 py-3 text-base font-medium text-white ${
                isItemInCart
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-black hover:bg-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
            >
              {isItemInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-6">
          {productDetail?.reviews && productDetail.reviews.length > 0 ? (
            <div className="space-y-6">
              {productDetail.reviews.map((review, index) => (
                <ProductReview key={index} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">
                No reviews yet for this product.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {similarProducts && similarProducts.length > 0 ? (
            similarProducts.map((product) => (
              <SingleProduct key={product.id} singleProduct={product} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No similar products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
