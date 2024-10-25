import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar1';

function ListNCC() {
    const [nccList, setNccList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNCC = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/NCC');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                console.log(data); // Kiểm tra dữ liệu ở đây
                setNccList(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNCC();
    }, []);

    const deleteNCC = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/NCC/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            // Cập nhật trạng thái để loại bỏ NCC đã xóa
            setNccList(nccList.filter(ncc => ncc._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-lg">Loading...</p></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-red-500">Error: {error}</p></div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Danh sách nhà cung cấp</h1>
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 border-b text-left text-gray-600">ID</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Tên nhà cung cấp</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Địa chỉ</th>
                                <th className="py-3 px-4 border-b text-left text-gray-600">Số ĐT</th>
                                <th className="py-3 px-4 border-b text-center text-gray-600">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nccList.map((NCC, index) => (
                                <tr key={NCC._id || index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-left">{NCC._id}</td>
                                    <td className="py-2 px-4 border-b text-left">{NCC.NCC_name}</td>
                                    <td className="py-2 px-4 border-b text-left">{NCC.NCC_address}</td>
                                    <td className="py-2 px-4 border-b text-left">{NCC.NCC_phone}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded">Sửa</button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 rounded"
                                                onClick={() => deleteNCC(NCC._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ListNCC;
