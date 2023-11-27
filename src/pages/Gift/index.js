import { useEffect, useState } from "react";
import { createHasVoucher, getVoucher } from "../../services/productsService";
import "./Gift.scss";
import { getCookie } from "../../helpers/cookie";
import { getUserById, updateThisUserLike } from "../../services/usersService";
import Swal from "sweetalert2";

function Gift() {
  const userId = getCookie("user_id");
  const [vouchers, setVouchers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchVouchers = async () => {
      const result = await getVoucher();
      setVouchers(result);
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const result = await getUserById(userId);
      setScore(result.score_to_award);
    };
    getUser();
  }, [userId]);


  const handleChange = (voucherId, discount_amount) => {
    if (score < discount_amount) {
      Swal.fire({
        title: 'Bạn không đủ điểm để đổi',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      // alert("Bạn không đủ điểm để đổi");
    } else {

      let option1 = {
        user_id: userId,
        numberlikes: -discount_amount,
      };

      const updateScore = async () => {
          const result = await updateThisUserLike(option1);
          if(result){
            Swal.fire({
              title: 'Đổi thành công!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            // alert("Đổi thành công!")
          }
      }
      let option2 = {
        user_id: userId,
        voucher_id: voucherId
      }

      const createNewHasVoucher = async () => {
        const result = await createHasVoucher(option2);
        if(result){
          setScore(score - discount_amount);
          updateScore();
        }
      }     
      createNewHasVoucher();
  
    }
  };

  return (
    <>
      <div className="gift">
        <div className="gift__wrap">
          <h1>Gift</h1>
          <div className="gift__info">Số điểm hiện tại: {score}</div>
          <div className="gift__list">
            {vouchers.map((item) => (
              <div className="gift__box" key={item.voucher_id}>
                <div className="gift__desc">
                  Phiếu giảm giá {item.discount_amount}%
                </div>
                <div className="gift__btn">
                  <button onClick={() => handleChange(item.voucher_id, item.discount_amount)}>
                    Đổi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gift;
