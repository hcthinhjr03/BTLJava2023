import { useDispatch, useSelector } from "react-redux";
import "./CartList.scss";
import CartItem from "./CartItem.js";
import { deleteAll } from "../../../actions/Cart.js";
import { getCookie } from "../../../helpers/cookie.js";
import { useEffect, useState } from "react";
import {
  getHasVoucher,
  getVoucherById,
} from "../../../services/productsService.js";

function CartList() {
  const userId = getCookie("id");
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [hasVouchers, setHasVouchers] = useState([]);

  useEffect(() => {
    const fetchHasVoucher = async () => {
      const result = await getHasVoucher(userId);
      setHasVouchers(result);
    };
    fetchHasVoucher();
  }, [userId]);

  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVoucher = async () => {
      const hasVoucherWithVoucher = await Promise.all(
        hasVouchers.map(async (hasVoucher) => {
          const voucherData = await getVoucherById(hasVoucher.voucher_id);
          return { ...hasVoucher, voucher: voucherData[0] };
        })
      );
      setVouchers(hasVoucherWithVoucher);
    };
    fetchVoucher();
  }, [hasVouchers]);

  const total = cart.reduce((sum, item) => {
    const priceNew = (
      item.info.price *
      ((100 - item.info.discount) / 100)
    ).toFixed(0);
    return sum + priceNew * item.quantity;
  }, 0);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const [discount, setDiscount] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const handleDiscount = (discount_id, discount_amount) => {
    if (discount_id === isActive) {
      setDiscount(0);
      setIsActive(0);
    } else {
      setIsActive(discount_id);
      setDiscount(discount_amount);
    }
  };

  const handleOrder = () => {
    
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
              <CartItem key={item.id} item={item} />
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
                      isActive === item.id
                        ? { color: "#fff",
                            backgroundColor: "#6a38ff" }
                        : { background: "#212529" }
                    }
                    onClick={() =>
                      handleDiscount(item.id, item.voucher.discount_amount)
                    }
                    key={item.id}
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
            Tổng tiền: {total - ((total * discount) / 100).toFixed(0)}$
          </div>
          <div className="cart__confirm">
            <button onClick={handleOrder}>Xác nhận đặt hàng</button>
          </div>
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
