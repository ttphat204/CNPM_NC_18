import React, { useState, useEffect } from "react";

import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useUser } from './UserContext';
import Header from "./header";
const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const account_id = localStorage.getItem('userId');

    useEffect(() => {
      if (account_id) {
        fetchCartItems();
      }
    }, [account_id]);
    const fetchCartItems = () => {
      axios.get(`http://localhost:5000/api/carts/account/${account_id}`)
        .then(response => {
          const items = (response.data.items || []).filter(item => item.product); 
          setCartItems(items);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
          setCartItems([]); 
        });
    };
    

    const updateQuantity = (productId, newQuantity) => {
      if (newQuantity < 0) return;

      axios.post('http://localhost:3004/cart/update', { userId, productId, quantity: newQuantity })
        .then(response => {
          fetchCartItems(); // Gọi lại API để lấy dữ liệu mới
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    };

    const removeItem = (productId) => {
      axios.post('http://localhost:3004/cart/xoa', { userId, productId })
        .then(response => {
          setCartItems(Array.isArray(response.data.cartItems) ? response.data.cartItems : []);
        })
        .catch(error => {
          console.error('Error removing item:', error);
        });
    };

    const calculateTotal = () => {
      return cartItems.reduce((total, item) => {
        if (!item.product) return total;
        return total + item.product.price * item.quantity;
      }, 0);
    };
    

  return (
    <>
    <Header />
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
          {cartItems.length > 0 ? (
  cartItems.map(item => {
    if (!item.product) return null; 

    return (
      <div key={item._id} className="flex items-center justify-between py-4 border-b">
        <img src={item.product.img} alt="Product" className="w-20 h-20 object-cover" />
        <div className="flex-grow px-4">
          <h3 className="font-bold">{item.product.product_name}</h3>
          <p className="text-gray-500">{item.product.newPrice}₫</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
            className="bg-gray-300 text-gray-700 px-2 rounded-l"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
            className="bg-gray-300 text-gray-700 px-2 rounded-r"
          >
            +
          </button>
        </div>
        <div className="font-bold text-lg">{item.quantity * item.product.price}₫</div>
        <button
          onClick={() => removeItem(item.product._id)}
          className="text-red-500 ml-4"
        >
          Xóa
        </button>
      </div>
    );
  })
) : (
  <p>Giỏ hàng của bạn đang trống.</p>
)}


     

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
