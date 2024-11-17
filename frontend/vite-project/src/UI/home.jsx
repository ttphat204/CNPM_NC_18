import axios from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperSection from './SwiperSection';
import ProductBlock from './ProductBlock';
import Footer from './Footer';
import Header from './Header';

const groupProducts = (products, itemsPerGroup) => {
  let grouped = [];
  for (let i = 0; i < products.length; i += itemsPerGroup) {
    grouped.push(products.slice(i, i + itemsPerGroup));
  }
  return grouped;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setGroupedProducts(groupProducts(res.data, 5));
      })
      .catch(err => console.log(err));
  }, []);

  const swiperImages = [
    'logo2.png', 'logo3.png', 'logo10.png', 'logo4.png',
    'logo8.png', 'logo6.png', 'logo5.png'
  ];

  return (
    <>
      <Header />
      <div className="bg-slate-100">
        <SwiperSection images={swiperImages} />

        {/* Image cards at the top */}
        <div className="mx-4 sm:mx-8 lg:mx-32 mt-24">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
            {["sale1.jpg", "sale2.jpg", "sale3.jpg"].map((imgSrc, idx) => (
              <div key={idx} className="relative flex-1 h-52 overflow-hidden rounded-lg border border-gray-300">
                <img src={imgSrc} className="w-full h-full object-cover transition-transform transform hover:scale-110 hover:opacity-50" />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
                  {idx === 0 ? "NO BRAND" : idx === 1 ? "NÔNG SẢN SẠCH" : "CHỈ CÓ TRÊN EMART"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First product slider */}
        <div className="h-auto bg-white mt-9 mx-4 sm:mx-8 lg:mx-32 mb-24">
          <div className="mb-10 pt-5 pl-6 pb-4 font-bold text-xl border-b-4">
            SẢN PHẨM BÁN CHẠY
          </div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {groupedProducts.map((productGroup, index) => (
              <SwiperSlide key={index} className="flex flex-row items-center bg-white text-black text-lg">
                {productGroup.map((product) => (
                  <ProductBlock key={product._id} product={product} />
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Second product section with image */}
        <div className="h-auto bg-white mt-9 mx-4 sm:mx-8 lg:mx-32 mb-24">
          <div className="pt-5 pl-6 pb-4 font-bold text-xl border-b-4">
            SẢN PHẨM MỚI
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0">
              <img
                src="sale4.jpg"
                className="w-full h-auto object-cover border border-gray-300"
                style={{ maxWidth: '450px' }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 mt-4 md:mt-0">
              {products.slice(0, 4).map(product => (
                <ProductBlock
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
