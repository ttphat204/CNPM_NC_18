import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faSearch, faCartShopping, faUser, faEarthAmericas, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function header({ username }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Phan Van Tri');
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsDropdownOpen(false);
    };

    const handleUserDropdownToggle = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        axios.get('http://localhost:5000/api/auth/logout', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                navigate('/');
            })
            .catch(err => console.log("Lỗi đăng xuất:", err));
    };

    const items = ['Phan Van Tri', 'Sala', 'Phan Huy Ich'];



    return (
        <header>
            {/* Header for screens 768px and larger */}
            <div className="bg-amber-400 h-auto w-full hidden md:flex flex-col md:flex-row items-center p-4">
                <Link to='/home' className="flex justify-left   mb-2 md:mb-0 md:ml-28   md:mr-6  ">
                    <img src="/emart.png" alt="Emart" className='w-36 h-8' />
                </Link>

                <div className="relative group">
                    <div className='flex items-center text-white cursor-pointer pr-4 pl-2 py-1 rounded-md hover:bg-amber-500'>
                        <FontAwesomeIcon icon={faBars} className="text-lg" />
                        <p className='ml-2 text-base'>Tất cả danh mục</p>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute bg-white shadow-lg rounded mt-2 w-56 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-3 hover:bg-gray-100">
                            <p className='hover:text-orange-500 cursor-pointer'>Khuyến mãi</p>
                        </div>
                        <div className="p-3 hover:bg-gray-100 relative group">
                            <p className='hover:text-orange-500 cursor-pointer'>Thực phẩm tươi sống</p>

                            {/* Submenu */}
                            <div className="hidden absolute top-0 left-full bg-white shadow-lg rounded w-40 group-hover:block z-50">
                                <div className="p-2 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">Rau</div>
                                <div className="p-2 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">Củ quả</div>
                                <div className="p-2 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">Trái cây</div>
                            </div>
                        </div>
                    </div>
                </div>


                <img src="/logo1.png" alt="Logo" className='w-7 h-11 ml-3 mr-3 pt-2' />

                <div className='relative mr-4'>
                    <div
                        className='flex items-center bg-white rounded-xl h-8 px-3 cursor-pointer justify-between'
                        onClick={handleDropdownToggle}
                    >
                        <p className='text-xs mx-1'>{selectedItem}</p>
                        <FontAwesomeIcon icon={faChevronDown} className='text-gray-500 ml-1' />
                    </div>

                    {/* Dropdown danh sách lựa chọn */}
                    {isDropdownOpen && (
                        <div className='absolute bg-white shadow-lg rounded-lg mt-1 w-28 z-50'>
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className='cursor-pointer text-xs px-3 py-1 hover:bg-gray-200 rounded-lg'
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='relative  flex  items-center justify-center'>
                    <input
                        className='flex-1 bg-white w-96 h-8  rounded-2xl pl-10'
                        type='text'
                        placeholder='Tìm sản phẩm mong muốn ...'
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className='absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 pr-2'
                    />
                </div>

                <div className='relative ml-5 text-white text-sm  cursor-pointer '>
                    <div onClick={handleUserDropdownToggle} className='flex flex-row justify-center items-center mr-10'>
                        <p className='ml-3 text-base'>Xin chào, {username}</p>
                        <FontAwesomeIcon icon={faChevronDown} className='ml-1' />
                    </div>
                    {isUserDropdownOpen && (
                        <div className='absolute bg-white shadow-lg rounded w-32 z-50'>
                            <div
                                className='cursor-pointer text-black text-xs border-b-2 px-2 py-1 hover:bg-slate-600 hover:text-white'
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                            </div>
                        </div>
                    )}
                </div>


                <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer'>
                    <Link to='/cart' className="flex flex-col items-center">
                        <p className='ml-0 text-base'><FontAwesomeIcon icon={faCartShopping} /></p>
                        <p>Giỏ Hàng</p>
                    </Link>
                </div>

                <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer'>
                    <p className='ml-3 text-base'><FontAwesomeIcon icon={faEarthAmericas} /></p>
                    <p>English</p>
                </div>
            </div>

            {/* Header for screens smaller than 640px */}
            <div className="bg-amber-400 h-auto w-full flex flex-col items-center p-4 sm:hidden">
                {/* Emart logo centered */}
                <Link to='/home' className="flex justify-center mb-2">
                    <img src="/emart.png" alt="Emart" className='w-36 h-8' />
                </Link>

                {/* Bottom row with icons and dropdowns */}
                <div className="flex flex-row items-center justify-around w-full">
                    <img src="/logo1.png" alt="Logo" className='w-7 h-11 pt-2' />

                    <div className='relative'>
                        <div
                            className='flex flex-row bg-white rounded-2xl h-8 w-24 mt-2 cursor-pointer'
                            onClick={handleDropdownToggle}
                        >
                            <div className='flex flex-row text-center flex-grow'>
                                <p className='text-xs mt-2 ml-1'>{selectedItem}</p>
                            </div>
                            {/* Icon nằm cố định ở bên phải */}
                            <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                                <FontAwesomeIcon icon={faChevronDown} className='text-gray-500 mt-3' />
                            </div>
                        </div>

                        {/* Dropdown danh sách lựa chọn */}
                        {isDropdownOpen && (
                            <div className='absolute bg-white shadow-lg rounded mt-2 w-24 z-50'>
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className='cursor-pointer text-xs border-b-2 px-2 py-1 rounded-2xl hover:bg-gray-200'
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className='relative flex-grow mt-2 ml-2'>
                        <input
                            className='bg-white rounded-2xl h-8 w-full pl-10'
                            type='text'
                            placeholder='Tìm kiếm...'
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className='absolute left-3 top-2 text-gray-500'
                        />
                    </div>

                    <Link to='/cart' className="flex flex-col items-center text-white ml-3">
                        <FontAwesomeIcon icon={faCartShopping} className='text-base mt-2' />
                        <p className='text-xs'>Giỏ Hàng</p>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default header;
