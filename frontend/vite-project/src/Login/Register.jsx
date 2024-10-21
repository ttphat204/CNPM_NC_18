import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/create', {
            username, name, email, password, phone
        })
            .then(res => {
                if (res.data.success) {
                    navigate('/');
                    alert('Đăng kí thành công');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Đăng ký thất bại. Vui lòng thử lại.');
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="bg-white w-[60%] p-8 shadow-md">
                <p className="bg-gray-400 text-white text-center font-bold p-3 mb-6">ĐĂNG KÍ TÀI KHOẢN</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 mb-2">Tên</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Nhập tên"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Nhập tên đăng nhập"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Số điện thoại</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Nhập số điện thoại"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Nhập email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
