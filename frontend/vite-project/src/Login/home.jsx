import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Hook must be called at the top level

    const handleLogout = () => {
        axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true })
            .then(response => {
                console.log(response.data); 
                 navigate('/'); 
            })
            .catch(err => console.log("Lỗi đăng xuất:", err));
    };
    

    return (
        <div className="mt-12">
            <div className="flex justify-center">
                <button
                    onClick={handleLogout} // Logout function
                    className="flex flex-col items-center text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    <p className="text-lg font-semibold">ĐĂNG XUẤT</p>
                    <FontAwesomeIcon className="text-2xl" icon={faSignOutAlt} /> {/* Logout icon */}
                </button>
            </div>
        </div>
    );
};

export default Home;
