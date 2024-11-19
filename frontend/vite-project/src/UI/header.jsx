import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight, faSearch, faCartShopping, faSignOutAlt, faChevronDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Header() {
  const [username, setUsername] = useState(""); // State lưu tên người dùng
  const [selectedLocation, setSelectedLocation] = useState("Phan Van Tri");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Sản phẩm lấy từ API
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm đã lọc theo tìm kiếm
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false); // Kiểm tra xem dropdown tìm kiếm có mở không
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // Điều khiển mở dropdown người dùng
  const [favorites, setFavorites] = useState([]); // Danh sách yêu thích
  const [isFavoritesDropdownOpen, setIsFavoritesDropdownOpen] = useState(false); // Điều khiển dropdown yêu thích

  const navigate = useNavigate();

  const locations = ["Phan Van Tri", "Sala", "Phan Huy Ich"];

  // Các refs để tham chiếu đến input và dropdown kết quả tìm kiếm
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  useEffect(() => {
    // Lấy danh mục từ API
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));

    // Lấy sản phẩm từ API
    axios
      .get("http://localhost:5000/api/products") // URL API lấy sản phẩm
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Mặc định hiển thị tất cả sản phẩm
      })
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));

    // Lấy tên người dùng từ localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername); // Lưu tên người dùng vào state
    }

    // Lấy danh sách sản phẩm yêu thích từ API hoặc localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout", { withCredentials: true })
      .then(() => {
        // Sau khi logout, xóa tên người dùng khỏi localStorage
        localStorage.removeItem("username");
        setUsername(""); // Đặt lại tên người dùng trong state
        navigate("/"); // Chuyển hướng về trang chủ
      })
      .catch((err) => console.error("Lỗi đăng xuất:", err));
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Mở hoặc đóng dropdown tìm kiếm khi có dữ liệu
    setIsSearchDropdownOpen(query.length > 0);
  };

  // Xử lý bấm ra ngoài để đóng dropdown tìm kiếm
  const handleClickOutside = (event) => {
    if (
      searchInputRef.current && !searchInputRef.current.contains(event.target) &&
      searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)
    ) {
      setIsSearchDropdownOpen(false); // Đóng dropdown khi bấm ngoài
    }
  };

  // Thêm sự kiện click khi component mount
  useEffect(() => {
    // Lắng nghe sự kiện mousedown để phát hiện click ra ngoài
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="bg-amber-400 h-auto w-full hidden md:flex flex-col md:flex-row items-center px-20 py-4">
        <Link to="/home" className="flex">
          <img src="/emart.png" alt="Emart" className="w-36 h-8" />
        </Link>

        {/* Dropdown menu for categories */}
        <div className="relative group">
          <div className="flex items-center text-white cursor-pointer pr-4 pl-2 py-1 rounded-md hover:bg-amber-500">
            <FontAwesomeIcon icon={faBars} className="text-lg" />
            <p className="ml-2 text-base">Tất cả danh mục</p>
          </div>

          <div className="absolute bg-white shadow-lg rounded mt-2 w-56 z-50 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[500px] transition-all duration-300 ease-out">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategoryClick(category.category_name)}
              >
                <FontAwesomeIcon icon={faChevronRight} className="mr-2 text-gray-600" />
                {category.category_name}
              </div>
            ))}
          </div>
        </div>

        <img src="/logo1.png" alt="Logo" className="w-7 h-11 ml-3 mr-3 pt-2" />

        {/* Location dropdown (hover version) */}
        <div className="relative group ml-4">
          <div className="flex items-center bg-white rounded-xl h-8 px-3 cursor-pointer justify-between w-32">
            <p className="text-xs mx-1">{selectedLocation}</p>
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
          </div>

          {/* Dropdown for location */}
          <div className="absolute bg-white shadow-lg rounded mt-1 w-32 z-50 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[200px] transition-all duration-300 ease-out">
            {locations.map((location, index) => (
              <div
                key={index}
                className="cursor-pointer text-xs px-3 py-1 hover:bg-gray-200 rounded-lg"
                onClick={() => handleLocationChange(location)}
              >
                {location}
              </div>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative flex items-center justify-center ml-4">
          <input
            ref={searchInputRef}
            className="bg-white w-96 h-8 rounded-2xl pl-10"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm sản phẩm mong muốn ..."
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          {/* Dropdown kết quả tìm kiếm */}
          {isSearchDropdownOpen && (
            <div
              ref={searchDropdownRef}
              className="absolute bg-white shadow-lg rounded mt-1 w-96 z-50 max-h-[300px] overflow-y-auto"
              style={{ top: '100%' }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/${product._id}`}  // Redirect to product detail page
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {product.product_name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">Không tìm thấy sản phẩm.</div>
              )}
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative ml-5 text-white text-sm cursor-pointer">
          <div
            onClick={() => setIsUserDropdownOpen((prev) => !prev)}
            className="flex flex-row items-center"
          >
            <p className="ml-3 text-base">Xin chào, {username || "Khách"}</p>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          {isUserDropdownOpen && (
            <div className="absolute bg-white shadow-lg rounded mt-2 w-56 z-50 max-h-64 overflow-y-auto">
              <div
                onClick={handleLogout}
                className="p-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                Đăng xuất
              </div>
            </div>
          )}
        </div>

        {/* Favorite and Cart Icons */}
        <div className="flex items-center ml-auto">
          {/* Favorite icon */}
          <div className="relative mr-4">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-2xl text-white cursor-pointer"
              onClick={() => setIsFavoritesDropdownOpen(!isFavoritesDropdownOpen)}
            />
            {/* Favorite Products Dropdown */}
            {isFavoritesDropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded mt-1 w-64 z-50 max-h-[300px] overflow-y-auto">
                {favorites.length > 0 ? (
                  favorites.map((product, index) => (
                    <Link
                      key={index}
                      to={`/product/${product._id}`} // Redirect to product detail page
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {product.product_name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">Chưa có sản phẩm yêu thích.</div>
                )}
              </div>
            )}
          </div>

          {/* Cart icon */}
          <div>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/cart")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
