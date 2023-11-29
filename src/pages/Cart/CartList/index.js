import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CartList.scss";
import CartItem from "./CartItem.js";
import { deleteAll } from "../../../actions/Cart.js";
import { getCookie } from "../../../helpers/cookie.js";
import { useEffect, useState } from "react";
import {
  createOrder,
  deleteHasVoucher,
  getHasVoucher,

} from "../../../services/productsService.js";
import SizeSelection from "./SizeSelection.js";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function CartList() {
  const userId = getCookie("user_id");
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();
  const [hasVoucherToDelete, setHasVoucherToDelete] = useState("");

  useEffect(() => {
    const fetchHasVoucherOfUser = async () => {
      const result = await getHasVoucher(userId);
      setVouchers(result);
    };
    fetchHasVoucherOfUser();
  }, [userId]);


  const total = cart.reduce((sum, item) => {
    const priceNew = (
      item.info.price *
      ((100 - item.info.discounted) / 100)
    ).toFixed(0);
    return sum + priceNew * item.quantity;
  }, 0);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const [discount, setDiscount] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const handleDiscount = (discount_id, discount_amount) => {
    setHasVoucherToDelete(discount_id);
    if (discount_id === isActive) {
      setDiscount(0);
      setIsActive(0);
    } else {
      setIsActive(discount_id);
      setDiscount(discount_amount);
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleOrder = () => {
    openModal();
  }

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="cart__deleteall">
            <button onClick={handleDeleteAll}>Xoá tất cả</button>
          </div>
          <div className="cart__list">
            {cart.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>
          <div className="cart__voucher">
            <div style={{ color: "#fff", fontSize: "30px", marginBottom: "20px" }}>Voucher</div>
            {vouchers.length > 0 ? (
              <>
                {vouchers.map((item) => (
                  <button
                    className="cart__discount"
                    style={
                      isActive === item.has_voucher_id
                        ? {
                          color: "#fff",
                          backgroundColor: "#6a38ff"
                        }
                        : { background: "#212529" }
                    }
                    onClick={() =>
                      handleDiscount(item.has_voucher_id, item.voucher.discount_amount)
                    }
                    key={item.has_voucher_id}
                  >
                    Giảm {item.voucher.discount_amount}%
                  </button>
                ))}
              </>
            ) : (
              <>
                <div style={{ color: "#fff", fontSize: "25px", marginBottom: "20px" }}>Bạn không có voucher nào</div>
              </>
            )}
          </div>
          <div className="cart__total">
            Tổng tiền: {total - ((total * discount) / 100).toFixed(0)}đ
          </div>
          <div className="cart__confirm">
            <button onClick={handleOrder}>Xác nhận đặt hàng</button>
          </div>
          <SizeSelection isOpen={modalIsOpen} onRequestClose={closeModal} cart={cart} style={customStyles} onConfirm={(productsInOrder, address, phone) => {

            const orderOptions = {
              user_id: userId,
              products: productsInOrder,
              address: address,
              contact: phone,
              total: total - ((total * discount) / 100).toFixed(0)
            }
            
            const createNewOrder = async () => {
              const result = await createOrder(orderOptions);
              if (result) {
                Swal.fire({
                  title: 'Đặt hàng thành công!',
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then((result) => {
                  
                  if (result.isConfirmed) {
                    navigate("/product")
                  }
                });
              }
            }
            createNewOrder();
            const hasVoucherId = hasVoucherToDelete;
            const deleteThisHasVoucher = async () => {
              const result = await deleteHasVoucher(hasVoucherId);
              console.log(result);
            }
            deleteThisHasVoucher();
          }} />
        </>
      ) : (
        <>
          <div style={{ color: "#fff", fontSize: "30px", textAlign: "center" }}>
            Giỏ hàng trống
          </div>
        </>
      )}
    </>
  );
}

export default CartList;
