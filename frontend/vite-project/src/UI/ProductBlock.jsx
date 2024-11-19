import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';  // Import PropTypes

const ProductBlock = ({ product }) => {
  const { _id, product_name, price, newPrice, img } = product;

  // Tính toán phần trăm khuyến mãi
  const discountPercentage = price && newPrice ? Math.round(((price - newPrice) / price) * 100) : 0;


  return (
    <Link to={`/product/${_id}`}>
      <div className="relative flex flex-col items-start bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-100 hover:scale-95 transition-all duration-300 h-full space-y-4">
        {/* Phần khuyến mãi */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 w-12 h-12 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full">
            {discountPercentage}% {/* Tạo hình tròn với số phần trăm bên trong */}
          </div>
        )}

        {/* Hình ảnh sản phẩm */}
        <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-md mb-4">
          <img
            src={img}
            alt={product_name}
            className="object-cover w-full h-full"  // Đảm bảo hình ảnh phủ đầy container mà không bị méo
          />
        </div>

        {/* Tên sản phẩm */}
        <div className="text-sm font-medium text-center line-clamp-2 mb-2">
          {product_name}
        </div>

        {/* Giá cả và Yêu thích */}
        <div className="flex items-center justify-between w-full mt-auto">
          {/* Giá tiền */}
          <div className="flex items-center">
            {newPrice ? (
              <>
                <span className="text-gray-500 text-xs line-through mr-2">
                  {price.toLocaleString()} VNĐ
                </span>
                <span className="text-red-500 font-bold text-sm">
                  {newPrice.toLocaleString()} VNĐ
                </span>
              </>
            ) : (
              <span className="text-gray-700 font-bold text-sm">
                {price.toLocaleString()} VNĐ
              </span>
            )}
          </div>

          {/* Yêu thích */}
          <button className="h-8 px-2 py-1 bg-gray-200 rouded ml-5 hover:text-orange-400 rounded-lg">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </Link>
  );
};

// PropTypes validation
ProductBlock.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    newPrice: PropTypes.number,
    img: PropTypes.string.isRequired,
    discount: PropTypes.number
  }).isRequired
};

export default ProductBlock;
