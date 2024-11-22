import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from './header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

function UserPanel() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      socket.emit('login', token);
    }

    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [token]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = { message, role: 'user' };
      socket.emit('sendMessage', msgData);
      setMessages((prevMessages) => [...prevMessages, msgData]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="h-[20%] bg-gray-100">
        <Header />
      </div>

      {/* Khung Chat */}
      <div className="h-[60%] flex flex-col items-center justify-between px-4 py-2 bg-gray-50 overflow-y-auto">
        <h1 className="text-center text-2xl font-bold mb-4">CHĂM SÓC KHÁCH HÀNG</h1>
        <div className="w-full max-w-4xl flex-grow space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center ${msg.role === 'adminPage1' ? 'justify-start' : 'justify-end'
                }`}
            >
              {msg.role === 'adminPage1' && (
                <div className="mr-2">
                  <FontAwesomeIcon icon={faUserTie} size="2x" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.role === 'adminPage1'
                  ? 'bg-gray-200 text-black'
                  : 'bg-blue-500 text-white'
                  }`}
              >
                {msg.message}
              </div>
              {msg.role === 'user' && (
                <div className="ml-2">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Khung nhập tin nhắn */}
      <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
        >
          Gửi
        </button>
      </div>

      {/* Footer */}
      <div className="h-[20%] bg-gray-100">
        <Footer />
      </div>
    </div>
  );
}

export default UserPanel;
