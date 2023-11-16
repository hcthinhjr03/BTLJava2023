import { useEffect, useState } from "react";
import { createHasVoucher, getHasVoucherWithVoucher, getVoucher } from "../../services/productsService";
import "./Gift.scss";
import { getCookie } from "../../helpers/cookie";
import { getUserById, updateScoreToAward } from "../../services/usersService";

function Gift() {
  const userId = getCookie("id");
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
      setScore(result[0].score_to_award);
    };
    getUser();
  }, [userId]);


  const handleChange = (voucherId, discount_amount) => {
    if (score < discount_amount) {
      alert("Bạn không đủ điểm để đổi");
    } else {

      let option1 = {
        score_to_award: score - discount_amount,
      };

      const updateScore = async () => {
          const result = await updateScoreToAward(userId, option1);
          if(result){
            alert("Đổi thành công!")
          }
      }
      let option2 = {
        user_id: parseInt(userId),
        voucher_id: parseInt(voucherId),
        expiration_date: "26/07/2030"
      }

      const createNewHasVoucher = async () => {
        const result = await createHasVoucher(option2);
        console.log(result);
      }

      const checkHasVoucher = async () => {
        const result = await getHasVoucherWithVoucher(userId, voucherId);
        if(result.length > 0){
            alert("Bạn đã sở hữu phiếu giảm giá này")
        } else {
            setScore(score - discount_amount);
            updateScore();
            createNewHasVoucher();
        }
      }
      checkHasVoucher();
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
              <div className="gift__box" key={item.id}>
                <div className="gift__desc">
                  Phiếu giảm giá {item.discount_amount}%
                </div>
                <div className="gift__btn">
                  <button onClick={() => handleChange(item.id, item.discount_amount)}>
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
