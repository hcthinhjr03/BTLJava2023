import { useEffect, useState } from "react";
import { approveOrder, deleteOrder, getAllOrder } from "../../../services/productsService";
import './ManageOrders.scss'
import { getCookie } from "../../../helpers/cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ManageOrders() {
    const userId = getCookie("user_id");
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const result = await getAllOrder();
            setOrders(result);
        }
        fetchOrders();
    }, [])

    const handleApprove = async (orderId) => {
        const options = {
            user_id: userId,
            order_id: orderId,
            status: 1
        }

        const result = await approveOrder(options);
        if (result) {
            Swal.fire({
                title: 'Duyệt thành công!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/private/admin")
                }
            });
        }
    }

    const handleDelete = async (orderId) => {
        const resultOfDelete = await deleteOrder(orderId);
        if (resultOfDelete) {
            const updatedOrders = orders.filter(
                (order) => order.order_id !== orderId
            );
            setOrders(updatedOrders);
        }
    }


    return (
        <>
            <div className="orders">
                <div className="orders__main">
                    <div className="orders__options"></div>
                    <div className="orders__table">
                        <div className="orders__table--header">
                            <table>
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>ID</th>
                                        <th rowSpan={2}>User ID</th>
                                        <th rowSpan={2}>Status</th>
                                        <th colSpan={4}>Products</th>
                                        <th rowSpan={2}>Total</th>
                                        <th rowSpan={2}>Address</th>
                                        <th rowSpan={2}>Contact</th>
                                        <th rowSpan={2}>Approve</th>
                                        <th rowSpan={2}>Delete</th>
                                    </tr>
                                    <tr>
                                        <th>Product ID</th>
                                        <th colSpan={2}>Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="orders__table--content">
                            <table>
                                <tbody>
                                    {orders.map((item) => (
                                        <tr key={item.order_id}>
                                            <td>{item.order_id}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.status === 0 ? "Đang chờ duyệt" : "Đang vận chuyển"}</td>
                                            <td colSpan={4}>
                                                {item.entries.map((entry) => (                                                  
                                                    <div key={entry.product_order_id}>
                                                        <tr >
                                                            <td>{entry.product.product_id}</td>
                                                            <td colSpan={2}>{entry.product.product_name}</td>
                                                            <td>{entry.quantity}</td>
                                                        </tr>
                                                    </div>                                                   
                                                ))}
                                            </td>
                                            <td>{item.total}</td>
                                            <td>{item.address}</td>
                                            <td>{item.contact}</td>
                                            <td>
                                                {item.status === 0 ? (
                                                    <><button onClick={() => handleApprove(item.order_id)}>Approve</button></>
                                                ) : (
                                                    <>Đã duyệt</>
                                                )}
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(item.order_id)}>Hủy đơn</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOrders;