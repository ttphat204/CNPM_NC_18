import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faSearch,
  faCartShopping,
  faSignOutAlt,
  faChevronDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Header() {
  const [state, setState] = useState({
    username: "",
    selectedLocation: "Phan Van Tri",
    categories: [],
    products: [],
    filteredProducts: [],
    searchQuery: "",
    favorites: [],
    isDropdownOpen: {
      search: false,
      user: false,
      category: false,
      favorites: false,
    },
  });

  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const dropdownRefs = useRef({}); // Dùng để quản lý nhiều dropdown
  const locations = ["Phan Van Tri", "Sala", "Phan Huy Ich"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/products"),
        ]);

        setState((prev) => ({
          ...prev,
          categories: categoriesRes.data,
          products: productsRes.data,
          filteredProducts: productsRes.data,
        }));
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };

    fetchData();

    const savedUsername = localStorage.getItem("username");
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setState((prev) => ({
      ...prev,
      username: savedUsername || "",
      favorites: savedFavorites,
    }));
  }, []);

  const toggleDropdown = (key) => {
    setState((prev) => ({
      ...prev,
      isDropdownOpen: {
        ...prev.isDropdownOpen,
        [key]: !prev.isDropdownOpen[key],
      },
    }));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    const filtered = state.products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );

    setState((prev) => ({
      ...prev,
      searchQuery: query,
      filteredProducts: filtered,
      isDropdownOpen: { ...prev.isDropdownOpen, search: query.length > 0 },
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("username");
      setState((prev) => ({ ...prev, username: "" }));
      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    }
  };

  const handleClickOutside = (e) => {
    if (
      Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(e.target)
      )
    ) {
      setState((prev) => ({
        ...prev,
        isDropdownOpen: {
          search: false,
          user: false,
          category: false,
          favorites: false,
        },
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="bg-amber-400 h-auto w-full hidden md:flex flex-col md:flex-row items-center px-20 py-4">
        {/* Logo */}
        <Link to="/home" className="flex">
          <img src="/emart.png" alt="Emart" className="w-36 h-8" />
        </Link>

        {/* Dropdown danh mục */}
        <div className="relative">
          <div
            className="flex items-center text-white cursor-pointer pr-4 pl-2 py-1 rounded-md hover:bg-amber-500"
            onClick={() => toggleDropdown("category")}
          >
            <FontAwesomeIcon icon={faBars} className="text-lg" />
            <p className="ml-2 text-base">Tất cả danh mục</p>
          </div>
          {state.isDropdownOpen.category && (
            <div
              ref={(ref) => (dropdownRefs.current.category = ref)}
              className="absolute bg-gray-100 shadow-md rounded-lg mt-2 w-80 z-50"
            >
              {state.categories.map((category, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-yellow-200 cursor-pointer rounded-md transition-all"
                  onClick={() => navigate(`/category/${category._id}`)}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="mr-2 text-gray-600"
                  />
                  <p className="text-lg font-medium text-gray-800">
                    {category.category_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thanh tìm kiếm */}
        <div className="relative flex items-center justify-center ml-4">
          <input
            ref={(ref) => (dropdownRefs.current.search = ref)}
            className="bg-white w-96 h-8 rounded-2xl pl-10"
            type="text"
            value={state.searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm sản phẩm mong muốn ..."
          />
          {state.isDropdownOpen.search && (
            <div
              className="absolute bg-white shadow-lg rounded mt-1 w-96 z-50 max-h-[300px] overflow-y-auto"
              style={{ top: "100%" }}
            >
              {state.filteredProducts.map((product, index) => (
                <Link
                  key={index}
                  to={`/product/${product._id}`}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {product.product_name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tài khoản và icon */}
        <div className="ml-auto flex items-center">
          <div
            onClick={() => toggleDropdown("user")}
            className="relative text-white text-sm cursor-pointer"
          >
            Xin chào, {state.username || "Khách"}
            {state.isDropdownOpen.user && (
              <div
                ref={(ref) => (dropdownRefs.current.user = ref)}
                className="absolute bg-white shadow-lg rounded mt-2 w-56"
              >
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
          <FontAwesomeIcon
            icon={faHeart}
            className="ml-4 text-2xl text-white cursor-pointer"
            onClick={() => toggleDropdown("favorites")}
          />
          <FontAwesomeIcon
            icon={faCartShopping}
            className="ml-4 text-2xl text-white cursor-pointer"
            onClick={() => navigate("/cart")}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
