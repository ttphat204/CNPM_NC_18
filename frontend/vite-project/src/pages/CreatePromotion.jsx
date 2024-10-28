// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CreatePromotion = () => {
//     const [categories, setCategories] = useState([]);
//     const [promotion, setPromotion] = useState({ code: '', discount: 0, categoryId: '' });

//     useEffect(() => {
//         axios.get('http://localhost:3004/categories/xem')
//             .then(res => setCategories(res.data))
//             .catch(err => console.error('Error fetching categories:', err));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPromotion(prevState => ({ ...prevState, [name]: value }));
//     };

//     const createPromotion = () => {
//         axios.post('http://localhost:3004/promotion/add', promotion)
//             .then(res => console.log('Promotion created:', res.data))
//             .catch(err => console.error('Error creating promotion:', err));
//     };

//     return (
//         <div>
//             <h1>Create Promotion</h1>
//             <input
//                 type="text"
//                 name="code"
//                 value={promotion.code}
//                 onChange={handleChange}
//                 placeholder="Promotion Code"
//             />
//             <input
//                 type="number"
//                 name="discount"
//                 value={promotion.discount}
//                 onChange={handleChange}
//                 placeholder="Discount"
//             />
//             <select name="categoryId" value={promotion.categoryId} onChange={handleChange}>
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                     <option key={category._id} value={category._id}>{category.name}</option>
//                 ))}
//             </select>
//             <button onClick={createPromotion}>Create Promotion</button>
//         </div>
//     );
// };

// export default CreatePromotion;



// E:\emart\client\src\components/CreatePromotion.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePromotion = () => {
  const [categories, setCategories] = useState([]);
  const [promotion, setPromotion] = useState({
    code: '',
    discount: 0,
    categoryId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories") 
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion(prevState => ({ ...prevState, [name]: value }));
  };

  const createPromotion = () => {
    axios.post('http://localhost:5000/promotion/add', promotion)
      .then(res => console.log('Promotion created:', res.data))
      .catch(err => console.error('Error creating promotion:', err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container flex flex-col mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Promotion</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="code"
            value={promotion.code}
            onChange={handleChange}
            placeholder="Promotion Code"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="discount"
            value={promotion.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="startDate"
            value={promotion.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="endDate"
            value={promotion.endDate}
            onChange={handleChange}
            placeholder="End Date"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <select
              id="categoryId"
              name="categoryId"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd040]"
              placeholder="Chọn danh mục"
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option
                  className="text-slate-950"
                  key={category._id}
                  value={category._id}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          <button
            onClick={createPromotion}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Promotion
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePromotion;

