import React, { useState, useEffect } from "react";

import Footer from './footer';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useUser } from './UserContext';

const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const { userId } = useUser();

//   useEffect(() => {
//     if (userId) {
//       fetchCartItems();
//     }
//   }, [userId]);

//   const fetchCartItems = () => {
//     axios.get(`http://localhost:3004/cart/${userId}`)
//       .then(response => {
//         setCartItems(response.data.cartItems);
//       })
//       .catch(error => {
//         console.error('Error fetching cart items:', error);
//       });
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 0) return;

//     axios.post('http://localhost:3004/cart/update', { userId, productId, quantity: newQuantity })
//       .then(response => {
//         fetchCartItems(); // Gọi lại API để lấy dữ liệu mới
//       })
//       .catch(error => {
//         console.error('Error updating quantity:', error);
//       });
//   };

//   const removeItem = (productId) => {
//     axios.post('http://localhost:3004/cart/xoa', { userId, productId })
//       .then(response => {
//         setCartItems(Array.isArray(response.data.cartItems) ? response.data.cartItems : []);
//       })
//       .catch(error => {
//         console.error('Error removing item:', error);
//       });
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
//   };

  return (
    <>
    
      <div className="mx-auto p-4 flex flex-col">
        <div className="bg-yellow-400 py-2 px-4 rounded-t-md flex items-center">
          <img src="cart-icon-1.png" className="h-10 w-10" alt="Cart Icon" />
          <h2 className="text-xl font-bold">Giỏ Hàng</h2>
        </div>

        <div className="bg-white p-4 shadow rounded-b-md">
          <div className="flex items-center border-b">
            <input type="checkbox" className="mr-2 h-4 w-4" />
            <span className="text-red-500">Bạn đang chọn giao hàng từ Emart Phan Van Tri</span>
          </div>

          {/* {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item._id || item.productId} className="flex items-center justify-between py-4 border-b">
                <img src={item.productId.imageUrl} alt="Product" className="w-20 h-20 object-cover" />
                <div className="flex-grow px-4">
                  <h3 className="font-bold">{item.productId.name}</h3>
                  <p className="text-gray-500">{item.productId.price}₫</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="bg-gray-300 text-gray-700 px-2 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="bg-gray-300 text-gray-700 px-2 rounded-r"
                  >
                    +
                  </button>
                </div>
                <div className="font-bold text-lg">{item.quantity * item.productId.price}₫</div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 ml-4"
                >
                  Xóa
                </button>
              </div>
            ))
          ) : (
            <p>Giỏ hàng của bạn đang trống.</p>
          )} */}
          {/* Phần này lấy theo giỏ hàng mà Tùng làm */}

          <div className="flex justify-between py-4">
            <div>
              <h4 className="font-bold">Giá trị đơn hàng</h4>
              <p className="text-lg">{calculateTotal()}₫</p>
            </div>
            <div className="text-right">
              <h4 className="font-bold">Tổng tiền hàng</h4>
              <p className="text-lg text-red-500">{calculateTotal()}₫</p>
            </div>
          </div>
          {/* <Link to='/ship'> */}
            <button className="w-full bg-yellow-400 text-white py-2 rounded-md">
              Thanh Toán  
            </button>
          {/* </Link> */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShoppingCart;
