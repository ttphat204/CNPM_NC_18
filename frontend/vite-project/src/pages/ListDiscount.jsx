  import { useEffect, useState } from 'react';
  import Sidebar from '../components/sidebar1';


  function ListDiscount() {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchDiscounts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/discounts');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDiscounts(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDiscounts();
    }, []);

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {discounts.map((discount) => (
                <li key={discount.id} className="p-2 border-b">
                  {discount.name}: {discount.discount}%
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    );
  }

  export default ListDiscount;
