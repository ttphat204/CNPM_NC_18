import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";


import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/auth/login', { username, password })
            .then(res => {
                if (res.data.login) {


                    console.log("User ID in Login:", res.data.userId);
                    switch (res.data.role) {
                        case 'adminPage1':
                            navigate('/dashboard');
                            break;
                        default:
                            navigate('/home');
                            break;
                    }
                } else {
                    console.log("Đăng nhập không thành công");
                }
                console.log(res)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-center mb-6">ĐĂNG NHẬP</h3>
                <input
                    type="text"
                    placeholder="Tên đăng nhập / Số điện thoại"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div className="flex items-center justify-between mb-4">
                    <FontAwesomeIcon className="text-gray-500" icon={faLock} />
                    <a href="#" className="text-sm text-yellow-500">QUÊN MẬT KHẨU</a>
                </div>
                <button
                    className="w-full h-12 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition duration-200"
                    onClick={handleSubmit}
                >
                    ĐĂNG NHẬP
                </button>
                <p className="text-center text-sm mt-4">
                    Liên hệ tổng đài Hỗ trợ khách hàng khi quên Tài khoản/Mật khẩu
                </p>
                <p className="text-center text-sm">Hotline: (028) 3622 4567</p>
                <div className="flex justify-center mt-6">

                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-center mb-4">ĐĂNG KÝ</h3>
                    <div className="flex justify-center">
                        <Link to="/dk" className="flex flex-col items-center text-center">
                            <p className="text-lg font-semibold">CHƯA CÓ TÀI KHOẢN</p>
                            <FontAwesomeIcon className="text-2xl" icon={faPhone} />
                            <p className="text-sm">Quý khách sẽ được cung cấp mã số thẻ mới khi đăng ký.</p>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;