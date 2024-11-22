import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Sidebar1 from '../components/sidebar1'; // Import Sidebar1

const socket = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket', 'polling'], // Kết nối với server qua WebSocket
});

function AdminPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      console.log('Sending token to server:', token);
      socket.emit('login', token); // Gửi token xác thực cho server
    } else {
      console.log('Token không hợp lệ hoặc không tồn tại');
    }

    socket.on('receiveMessage', (msg) => {
      console.log('Admin received message:', msg); // Log tin nhắn từ user
      setMessages((prevMessages) => [...prevMessages, msg]); // Cập nhật danh sách tin nhắn
    });

    return () => {
      socket.off('receiveMessage'); // Ngừng lắng nghe sự kiện khi unmount
    };
  }, [token]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { message, role: 'adminPage1' }; // Gửi tin nhắn từ admin
      socket.emit('sendMessage', msgData);
      setMessages((prevMessages) => [...prevMessages, msgData]); // Hiển thị tin nhắn của admin
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar1 />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-4 bg-gray-100">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">CHĂM SÓC KHÁCH HÀNG</h1>
        </div>

        {/* Khung Chat */}
        <div className="flex flex-col flex-grow bg-white shadow-md rounded-lg p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center mb-4 ${msg.role === 'adminPage1' ? 'justify-end' : 'justify-start'
                }`}
            >
              {/* Avatar user */}
              {msg.role === 'user' && (
                <div className="mr-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    U
                  </div>
                </div>
              )}
              {/* Tin nhắn */}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.role === 'adminPage1'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
                  }`}
              >
                {msg.message}
              </div>
              {/* Avatar admin */}
              {msg.role === 'adminPage1' && (
                <div className="ml-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    A
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Khung nhập tin nhắn */}
        <div className="flex items-center mt-4 bg-white shadow-md rounded-lg p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn phản hồi..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
