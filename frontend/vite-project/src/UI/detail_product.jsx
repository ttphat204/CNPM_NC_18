import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from './header';
// import { useUser } from './UserContext';

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
//   const { userId } = useUser(); // Lấy userId từ UserContext
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const maxQuantity = 24;

  useEffect(() => {
    if (!id) {
        console.error('Product ID is missing');
        return;
      }
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product ? product.quantity : maxQuantity)) {
      setQuantity(quantity + 1);
    }
  };

//   const addToCart = () => {
//     if (userId) {
//       axios.post('http://localhost:3004/cart/add', { userId, productId: product._id, quantity })
//         .then(response => {
//           if (response.data.success) {
//             navigate('/cart'); // Điều hướng đến trang giỏ hàng
//           } else {
//             console.error('Error adding to cart:', response.data.message);
//           }
//         })
//         .catch(error => {
//           console.error('Error adding to cart:', error);
//         });
//     } else {
     
//       console.log('Please log in to add items to the cart.');
//       navigate('/login'); // Điều hướng đến trang đăng nhập
//     }
//   };
// Phần này ní viết thêm vào giỏ r đổi api r sử dụng lại 
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <div>{product?.description}</div>;
      case 'reviews':
        return (
          <div>
            <p>Nang 15/08/2018</p>
            <p>Luon dang tin cay, rat hai long ve san pham</p>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Viết đánh giá</p>
            <p>Bạn vui lòng đăng nhập để đánh giá sản phẩm</p>
          </div>
        );
      case 'qa':
        return <div>Phần hỏi đáp.</div>;
      default:
        return null;
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
  <Header/>
      <div className='bg-slate-100'>
        <div className='h-auto w-full bg-slate-100 mb-11'>
          <p className='text-xs text-gray-500 ml-32 mt-5 font-extr'>
            <span className='mr-2'>TRANG CHỦ</span>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className='text-black ml-3'>{product.name}</span>
          </p>
          <div className='w-4/5 h-auto bg-white ml-32 mt-5 flex flex-row mb-8'>
            <img className='flex-2 w-1/3' src={product.img} alt={product.name} />
            <div className='pl-12 left-1 w-2/5 mt-5'>
              <h1 className='font-bold'>{product.name}</h1>
              <h2 className='text-red-600 text-2xl mt-2 border-b-2 border-gray-200 pb-4'>
                {product.newPrice || product.price}₫
              </h2>
              <div className='flex flex-row text-orange-500 text-xs mt-5'>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <p className='text-black hover:text-orange-400 hover:cursor-pointer ml-3'>
                  Dựa trên 1 đánh giá /
                </p>
                <p className='text-black hover:text-orange-400 hover:cursor-pointer ml-3'>
                  Viết đánh giá
                </p>
              </div>
              <div className='mt-4 flex flex-row'>
                <div className='flex items-center'>
                  <button onClick={decrementQuantity} className='px-3 h-8 bg-gray-200 rounded'>-</button>
                  <input type='text' value={quantity} readOnly className='w-12 text-center border rounded h-8' />
                  <button onClick={incrementQuantity} className='px-3 h-8 bg-gray-200 rounded'>+</button>
                </div>
                {quantity === maxQuantity && (
                  <div className='mt-4 p-3 bg-blue-100 text-blue-700 rounded'>
                    <i className='fas fa-info-circle'></i> Số lượng tối đa mua trong ngày là 24
                  </div>
                )}
                <div className='pl-2'>
                  <button  className='h-8 px-4 py-1 bg-yellow-500 text-white rounded ml-2'>Thêm vào giỏ</button>

                  {/* onClick={addToCart} */}
                  <button className='h-8 px-4 py-1 bg-yellow-600 text-white rounded ml-2'>Mua ngay</button>
                  <button 
                 
                    className='h-8 px-2 py-1 bg-gray-200 rounded ml-5 hover:text-orange-400'
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex-1'>
              {/* Nội dung khác nếu cần */}
            </div>
          </div>
          <div className='w-4/5 bg-white ml-32 mt-5 flex flex-col'>
            <nav className='border-b border-gray-200'>
              <ul className='flex'>
                <li className={`mr-1 ${activeTab === 'description' ? 'border-black border-b-2' : ''}`}>
                  <button
                    className='bg-white inline-block py-2 px-4 text-black font-semibold'
                    onClick={() => setActiveTab('description')}
                  >
                    <h2 className="text-xl font-bold">Chi Tiết Sản Phẩm</h2>
                  </button>
                </li>
                <li className={`mr-1 ${activeTab === 'reviews' ? 'border-black border-b-2' : ''}`}>
                  <button
                    className='bg-white inline-block py-2 px-4 text-black font-semibold'
                    onClick={() => setActiveTab('reviews')}
                  >
                    Đánh giá (1)
                  </button>
                </li>
                <li className={`mr-1 ${activeTab === 'qa' ? 'border-black border-b-2' : ''}`}>
                  <button
                    className='bg-white inline-block py-2 px-4 text-black font-semibold'
                    onClick={() => setActiveTab('qa')}
                  >
                    Hỏi/Đáp
                  </button>
                </li>
              </ul>
            </nav>
            <div className='p-4'>
              {renderTabContent()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DetailProduct;

