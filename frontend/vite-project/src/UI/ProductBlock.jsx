import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const ProductBlock = ({ product }) => {
  const { _id, product_name, price, newPrice, img } = product;

  // Tính toán phần trăm giảm giá
  const discountPercentage =
    price && newPrice ? Math.round(((price - newPrice) / price) * 100) : 0;

  // Hàm thêm vào giỏ hàng
  const handleAddToCart = (productId) => {
    const accountId = localStorage.getItem("userId"); // Lấy accountId từ localStorage
    const quantity = 1; // Số lượng mặc định là 1

    if (!accountId) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    console.log("Adding to cart with data:", {
      account_id: accountId,
      product_id: productId,
      quantity,
    });

    axios
      .post("http://localhost:5000/api/carts", {
        account_id: accountId,
        product_id: productId,
        quantity: quantity,
      })
      .then((response) => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng:", response.data);
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      });
  };

  // Hàm thêm vào danh sách yêu thích
  const handleAddToFavorite = () => {
    const account_id = localStorage.getItem("userId");
    if (!account_id) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.");
      return;
    }

    // Gửi yêu cầu thêm sản phẩm vào danh sách yêu thích
    axios
      .post("http://localhost:5000/api/likelist/add", {
        accountId: account_id,
        productId: _id,
      })
      .then((response) => {
        console.log("Đã thêm vào danh sách yêu thích:", response.data);
        alert("Sản phẩm đã được thêm vào danh sách yêu thích!");
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi thêm vào danh sách yêu thích:", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm vào danh sách yêu thích.");
      });
  };

  return (
    <div className="relative flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-100 hover:scale-95 transition-all duration-300 h-full space-y-4">
      {/* Hình ảnh sản phẩm với nhãn giảm giá */}
      <Link
        to={`/product/${_id}`}
        className="w-full h-48 flex items-center justify-center overflow-hidden rounded-md mb-4 relative"
      >
        {/* Nhãn giảm giá nằm trên ảnh */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-10 w-12 h-12 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full">
            {discountPercentage}%
          </div>
        )}
        <img
          src={img}
          alt={product_name}
          className="object-cover w-full h-full cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </Link>

      {/* Tên sản phẩm */}
      <div className="text-sm font-medium text-center mb-2 line-clamp-2">
        {product_name}
      </div>

      {/* Giá */}
      <div className="flex items-center justify-center mb-4">
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

      {/* Nút Thêm vào Yêu Thích & Thêm vào Giỏ Hàng */}
      <div className="flex items-center justify-between w-full space-x-4">
        {/* Nút Thêm vào Giỏ Hàng */}
        <button
          onClick={() => handleAddToCart(_id)} // Truyền đúng productId
          className="w-32 bg-yellow-400 text-white py-1 rounded-md hover:bg-red-500 transition duration-200"
        >
          Thêm Giỏ Hàng
        </button>

        {/* Nút Yêu Thích */}
        <button
          onClick={handleAddToFavorite}
          className="h-8 px-2 py-1 bg-gray-200 rounded hover:text-orange-400 rounded-lg"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

// Xác thực kiểu dữ liệu của các thuộc tính
ProductBlock.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired, // ID sản phẩm
    product_name: PropTypes.string.isRequired, // Tên sản phẩm
    price: PropTypes.number.isRequired, // Giá gốc
    newPrice: PropTypes.number, // Giá khuyến mãi
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductBlock;
