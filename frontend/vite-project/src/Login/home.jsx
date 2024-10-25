import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const home = () => {

    const handleLogout = () => {
        axios.get('http://localhost:5000/api/auth/logout')
            .then(() => {

                useNavigate('/'); // Điều hướng về trang đăng nhập sau khi đăng xuất
            })
            .catch(err => console.log(err));
    };

    return (

        <div className="mt-12">

            <div className="flex justify-center">
                <button
                    onClick={handleLogout} // Hàm đăng xuất
                    className="flex flex-col items-center text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    <p className="text-lg font-semibold">ĐĂNG XUẤT</p>
                    <FontAwesomeIcon className="text-2xl" icon={faSignOutAlt} /> {/* Biểu tượng đăng xuất */}
                </button>
            </div>
        </div>



    );
}
export default home;