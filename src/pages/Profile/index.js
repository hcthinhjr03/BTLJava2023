import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import {
  getEmail,
  getUserById,
  updateUser
} from "../../services/usersService";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { checkAuthen } from "../../actions/authentication";
//import Swal from "sweetalert2";

function Profile() {
  const id = getCookie("user_id");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState({});
  //const [phone, setPhone] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUserById(id);
      setUser(result);
    };
    fetchApi();
  }, [id]);
  

  useEffect(() => {
    const optionEmail = {
      user_id: id
    }

    const fetchEmail = async () => {
      const result = await getEmail(optionEmail);
      setEmail(result);
    };
    fetchEmail();
  }, [id]);


  // useEffect(() => {
  //   const fetchPhone = async () => {
  //     const result = await getPhone(id);
  //     setPhone(result[0]);
  //   };
  //   fetchPhone();
  // }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value;
    const image = e.target.elements.image.value;
    const favor_fc = e.target.elements.favor_fc.value;
  

    const options = {
      user_id: id,
      detail_position: address,
      avatar_image_path: image,
      favor_fc: favor_fc,

      gender : user.gender,
      full_name : user.full_name,
      date_of_birth : user.date_of_birth,

      email : email.email,
      phone_number : "123456789",
      country : "",
      city : "",
      district : "",
      description_text : "",
      user_role: user.user_role,
      score_to_award: user.score_to_award
    };

    const result = await updateUser(options);
    if (result) {
      Swal.fire({
        title: 'Cập nhật thông tin thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {      
          navigate("/");      
        } 
      });
    }
  };

  // const handleUpdateRole = async (e) => {
  //   e.preventDefault();
  //   if (user.score_to_award < 100) {
  //     Swal.fire({
  //       title: "Bạn chưa đủ điểm!",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //     //alert("Bạn chưa đủ điểm!");
  //   } else {
  //     let options = {
  //       role: 1,
  //     };
  //     const resultOfUpdateRole = await updateUser(user.id, options);
  //     if (resultOfUpdateRole) {
  //       dispatch(checkAuthen(false));
  //       // alert("Chúc mừng bạn đã trở thành người đóng góp! Giờ đây bạn có thể đăng bài!")
  //       Swal.fire({
  //         title:
  //           "Chúc mừng bạn đã trở thành người đóng góp! Giờ đây bạn có thể đăng bài! Hãy đăng nhập để đăng bài viết đầu tiên của bạn",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       }).then((result) => {
  //         /* Read more about isConfirmed, isDenied below */
  //         if (result.isConfirmed) {
  //           navigate("/login");
  //         }
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <div className="profile">
        <div className="profile__wrap">
          <div className="profile__left">
            <div className="profile__avatar">
              <img
                src={
                  user.avatar_image_path === 'avatar_image_path' ? 
                  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E" : user.avatar_image_path
                }
                alt=""
              />
            </div>
            <div className="profile__name">{user.full_name}</div>
            <div className="profile__dob">{user.date_of_birth}</div>
            {/* <div className="profile__email">{email}</div> */}
            <div className="profile__gender">
              Giới tính: {user.gender ? "Nam" : "Nữ"}
            </div>
          </div>
          <div className="profile__right">
            <div className="profile__form">
              <form onSubmit={handleSubmit}>
                <label>Avatar:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="image"
                  defaultValue={user.avatar_image_path === 'avatar_image_path' ? "" : user.avatar_image_path}
                />
                <label>Address:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="address"
                  defaultValue={user.detail_position}
                />
                <label>Email:</label>
                <input
                  className="profile__input"
                  type="email"
                  name="email"
                  value={email.email}
                />
                {/* <label>Phone number:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="phone_number"
                  // defaultValue={phone ? phone.phone_number : ""}
                /> */}
                <label>Favorite FC:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="favor_fc"
                  defaultValue={user.Favor_fc === 'favor_fc' ? "" : user.Favor_fc}
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
