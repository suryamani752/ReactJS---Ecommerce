import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    } else {
      stars.push(<i key={i} className="ri-star-line text-gray-300"></i>);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

const ProductReview = ({ review }) => {
  const reviewDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900">
          {review.reviewerName}
        </h4>
        <p className="text-xs text-gray-500">{reviewDate}</p>
      </div>
      <div className="mt-1">
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ProductReview;
