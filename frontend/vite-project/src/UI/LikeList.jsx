import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const accountId = localStorage.getItem("userId"); // Lấy từ localStorage
        const response = await axios.get(
          `http://localhost:5000/api/likelist/${accountId}`
        );
        console.log("Favorites:", response.data); // In ra xem dữ liệu nhận được
        setFavorites(response.data.favorites || []); // Đảm bảo data.favorites tồn tại
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromLikeList = (productId) => {
    const accountId = localStorage.getItem("userId"); // Lấy accountId từ localStorage

    axios
      .delete(`http://localhost:5000/api/likelist/remove/${productId}`, {
        data: { accountId, productId }, // Gửi cả accountId và productId trong body
      })
      .then((response) => {
        setFavorites(favorites.filter((fav) => fav.product._id !== productId)); // Cập nhật lại state favorites
      })
      .catch((error) => {
        console.error("Lỗi khi xóa khỏi danh sách yêu thích:", error);
      });
  };

  const handleAddToCart = (productId) => {
    const accountId = localStorage.getItem("userId"); // Lấy accountId từ localStorage
    const quantity = 1; // Số lượng mặc định là 1

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
      })
      .catch((error) => {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-yellow-50 mt-14 mb-32">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Sản Phẩm Yêu Thích
        </h1>
        <div className="space-y-4">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex-1 ml-4">
                  <h2
                    className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-yellow-600"
                    onClick={() => navigate(`/product/${item.product._id}`)}
                  >
                    {item.product.product_name}
                  </h2>
                  <p className="text-gray-600">Giá: {item.product.price}₫</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => handleAddToCart(item.product._id)} // Gọi hàm thêm vào giỏ
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => removeFromLikeList(item.product._id)} // Gọi hàm xóa sản phẩm khỏi danh sách yêu thích
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">
              Danh sách yêu thích trống
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoriteList;
