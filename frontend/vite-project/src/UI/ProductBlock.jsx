import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductBlock = ({ product }) => {
  const { _id, product_name, price, newPrice, img, discount } = product;

  // Tính toán phần trăm khuyến mãi
  const discountPercentage =
    price && newPrice ? Math.round(((price - newPrice) / price) * 100) : 0;

  return (
    <Link to={`/product/${_id}`}>
      <div className="relative pl-7 flex-1 flex flex-col hover:shadow-2xl transition-shadow duration-300">
        {/* Phần khuyến mãi */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 w-20 h-8 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
            {discountPercentage}% Discount
          </div>
        )}
        <img src={img} alt={product_name} />
        <div className="text-xs">{product_name}</div>
        <div className="flex flex-row mt-3">
          {newPrice ? (
            <>
              <p className="text-xs">
                <span className="line-through">{price}</span>
              </p>
              <p className="text-red-500 ml-2">{newPrice}</p>
            </>
          ) : (
            <p className="text-xs">{price}</p>
          )}
          <p className="text-slate-400 hover:text-red-500 block ml-2">
            <FontAwesomeIcon icon={faHeart} className="text-current" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductBlock;
