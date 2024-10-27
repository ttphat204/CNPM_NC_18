import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar1";
import axios from "axios";

const AddProduct = () => {
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductImg, setProductImg] = useState("");
  const [ProductDes, setProductDes] = useState("");
  const [ProductDis, setProductDis] = useState("");
  const [ProductNewPrice, setProductNewPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories created by admin
    axios
      .get("http://localhost:5000/api/categories") // Assuming this endpoint fetches all category
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching NCC:", err));
  }, []);

  // Hàm kiểm tra hợp lệ của thông tin
  const validateForm = () => {
    const newErrorMessages = {};

    if (!ProductName.trim()) {
      newErrorMessages.ProductName = "Tên sản phẩm không được để trống.";
    }
    if (!ProductPrice.trim()) {
      newErrorMessages.ProductPrice = "Giá sản phẩm không được để trống.";
    }
    if (!ProductImg.trim()) {
      newErrorMessages.ProductImg = "Hình ảnh sản phẩm không được để trống.";
    }

    setErrorMessages(newErrorMessages); // Cập nhật thông báo lỗi
    return Object.keys(newErrorMessages).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Nếu không hợp lệ, dừng lại

    const CategoryId = document.getElementById("CategoryId").value;

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: ProductName,
          price: ProductPrice,
          img: ProductImg,
          des_product: ProductDes,
          category: CategoryId,
          discount: ProductDis,
          newPrice: ProductNewPrice,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Thêm sản phẩm thành công!");
        setProductName("");
        setProductPrice("");
        setProductImg("");
        setProductDes("");
        setProductDis("");
        setProductNewPrice("");
        setErrorMessages({}); // Reset thông báo lỗi
      } else {
        setSuccessMessage("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      setSuccessMessage("Lỗi kết nối, vui lòng thử lại.", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Thêm danh mục</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Nhập tên sản phẩm  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductName"
            >
              Tên sản phẩm
            </label>
            <input
              type="text"
              id="ProductName"
              placeholder="Nhập tên sản phẩm"
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductName ? "border-red-500" : ""
              }`}
            />
            {errorMessages.ProductName && (
              <p className="text-red-500 text-sm">
                {errorMessages.ProductName}
              </p>
            )}{" "}
          </div>

          {/* Nhập giá sản phẩm  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductPrice"
            >
              Giá sản phẩm
            </label>
            <input
              type="text"
              id="ProductPrice"
              placeholder="Nhập giá sản phẩm"
              value={ProductPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductPrice ? "border-red-500" : ""
              }`}
            />
            {errorMessages.ProductPrice && (
              <p className="text-red-500 text-sm">
                {errorMessages.ProductPrice}
              </p>
            )}{" "}
          </div>

          {/* Nhập link hình ảnh  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductImg"
            >
              Hình ảnh sản phẩm
            </label>
            <input
              type="text"
              id="ProductImg"
              placeholder="Nhập đường dẫn ảnh sản phẩm"
              value={ProductImg}
              onChange={(e) => setProductImg(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductImg ? "border-red-500" : ""
              }`}
            />
            {errorMessages.ProductImg && (
              <p className="text-red-500 text-sm">{errorMessages.ProductImg}</p>
            )}{" "}
          </div>

          {/* Nhập link hình ảnh  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductDes"
            >
              Mô tả sản phẩm
            </label>
            <input
              type="text"
              id="ProductDes"
              placeholder="Nhập mô tả sản phẩm"
              value={ProductDes}
              onChange={(e) => setProductDes(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductImg ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Chọn danh mục  */}
          <div className="mb-4">
            <label
              htmlFor="CategoryId"
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
            >
              Danh mục
            </label>
            <select
              id="CategoryId"
              name="CategoryId"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
              placeholder="Chọn danh mục"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option
                  className="text-slate-950"
                  key={category._id}
                  value={category._id}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Nhập discount  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductDis"
            >
              Giảm giá
            </label>
            <input
              type="text"
              id="ProductDis"
              placeholder="Nhập giảm giá"
              value={ProductDis}
              onChange={(e) => setProductDis(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductImg ? "border-red-500" : ""
              }`}
            />
          </div>

          {/* Nhập giá mới  */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-[17px] font-bold mb-2 text-left"
              htmlFor="ProductNewPrice"
            >
              Giá mới
            </label>
            <input
              type="text"
              id="ProductNewPrice"
              placeholder="Nhập giá mới"
              value={ProductNewPrice}
              onChange={(e) => setProductNewPrice(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040] ${
                errorMessages.ProductImg ? "border-red-500" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-[#ffd040] text-white font-bold py-2 px-4 rounded hover:bg-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
          >
            Thêm sản phẩm
          </button>
        </form>
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
      </main>
    </div>
  );
};

export default AddProduct;
