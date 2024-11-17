import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductBlock from "./ProductBlock";
import Header from "./header";
import Footer from "./Footer";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Lấy tên danh mục từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Kiểm tra và đảm bảo categoryName không bị lỗi mã hóa
    const category = encodeURIComponent(categoryName);
    console.log("Sending request with category:", category); // In ra để kiểm tra

    axios
      .get(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Lỗi khi lấy sản phẩm theo danh mục:", err);
      });
  }, [categoryName]);

  return (
    <>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductBlock key={product._id} product={product} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm trong danh mục này.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
