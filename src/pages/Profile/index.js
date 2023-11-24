import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { creatEmail, creatPhone, getEmail, getPhone, getUserById, updateEmail, updatePhone, updateUser } from "../../services/usersService";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";
import Swal from "sweetalert2";

function Profile() {
  const id = getCookie("id");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUserById(id);
      setUser(result[0]);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchEmail = async () => {
      const result = await getEmail(id);
      setEmail(result[0]);
    }
    fetchEmail();
  }, [id]);

  useEffect(() => {
    const fetchPhone = async () => {
      const result = await getPhone(id);
      setPhone(result[0]);
    }
    fetchPhone();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value;
    const image = e.target.elements.image.value;
    const favor_fc = e.target.elements.favor_fc.value;
    const newEmail = e.target.elements.email.value;
    const new_phone_number = e.target.elements.phone_number.value;

    const updateEmailOptions = {
      email: newEmail
    }

    const createEmailOptions = {
      email: newEmail,
      user_id: parseInt(id)
    }

    if(email) {
      const result = await updateEmail(email.id, updateEmailOptions);
      if(result) {
        navigate("/");
      }
    } else {
      const result = await creatEmail(createEmailOptions);
      if(result) {
        navigate("/");
      }
    }

    const updatePhoneOptions = {
      phone_number: new_phone_number
    }

    const createPhoneOptions = {
      phone_number: new_phone_number,
      user_id: parseInt(id)
    }

    if(phone) {
      const result = await updatePhone(phone.id, updatePhoneOptions);
      if(result) {
        navigate("/");
      }
    } else {
      const result = await creatPhone(createPhoneOptions);
      if(result) {
        navigate("/");
      }
    }

    const options = {
      address: address,
      image: image,
      favor_fc: favor_fc,
    };

    const result = await updateUser(id, options);
    if(result) {
      navigate("/");
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (user.score_to_award < 100) {
      Swal.fire({
        title: 'Bạn chưa đủ điểm!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      //alert("Bạn chưa đủ điểm!");
    } else {

      let options = {
        role: 1
      }
      const resultOfUpdateRole = await updateUser(user.id, options);
      if(resultOfUpdateRole){
        dispatch(checkAuthen(false));
        // alert("Chúc mừng bạn đã trở thành người đóng góp! Giờ đây bạn có thể đăng bài!")
        Swal.fire({
          title: 'Chúc mừng bạn đã trở thành người đóng góp! Giờ đây bạn có thể đăng bài! Hãy đăng nhập để đăng bài viết đầu tiên của bạn',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/login");
          } 
        });
      }
    }
  };

  return (
    <>
      <div className="profile">
        <div className="profile__wrap">
          <div className="profile__left">
            <div className="profile__avatar">
              <img
                src={
                  user.image ||
                  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                }
                alt=""
              />
            </div>
            <div className="profile__name">{user.fullName}</div>
            <div className="profile__dob">{user.dateOfBirth}</div>
            <div className="profile__gender">
              Giới tính: {user.gender === "1" ? "Nam" : "Nữ"}
            </div>
            {user.role === 1 ? (
              <>Người đăng bài</>
            ) : (
              <>
                <form onSubmit={handleUpdateRole} style={{marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <span>Score: {user.score_to_award}/100</span>
                  <button style={{marginTop: "5px"}}>Become Writer</button>
                </form>
              </>
            )}
          </div>
          <div className="profile__right">
            <div className="profile__form">
              <form onSubmit={handleSubmit}>
                <label>Avatar:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="image"
                  defaultValue={user.image}
                />
                <label>Address:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="address"
                  defaultValue={user.address}
                />
                <label>Email:</label>
                <input
                  className="profile__input"
                  type="email"
                  name="email"
                  defaultValue={email ? email.email : ""}
                />
                <label>Phone number:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="phone_number"
                  defaultValue={phone ? phone.phone_number : ""}
                />
                <label>Favorite FC:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="favor_fc"
                  defaultValue={user.favor_fc}
                />
                <button>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
