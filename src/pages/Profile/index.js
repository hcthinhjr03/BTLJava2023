import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getUserById, updateUser } from "../../services/usersService";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";

function Profile() {
  const id = getCookie("id");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [role, setRole] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUserById(id);
      setUser(result[0]);
    };
    fetchApi();
  }, [id]);

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const fullName = e.target.elements.fullName.value;
    const dateOfBirth = e.target.elements.dateOfBirth.value;
    const address = e.target.elements.address.value;
    const image = e.target.elements.image.value;
    const favor_fc = e.target.elements.favor_fc.value;

    const options = {
      address: address,
      image: image,
      favor_fc: favor_fc,
      fullName: fullName,
      dateOfBirth: dateOfBirth,
    };

    const result = await updateUser(id, options);
    console.log(result);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (user.score_to_award < 100) {
      alert("Bạn chưa đủ điểm!");
    } else {

      let options = {
        role: 1
      }
      const resultOfUpdateRole = await updateUser(user.id, options);
      if(resultOfUpdateRole){
        dispatch(checkAuthen(false));
        alert("Chúc mừng bạn đã trở thành người đóng góp! Giờ đây bạn có thể đăng bài!")
        navigate("/login");
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
                <label>Full Name:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="fullName"
                  defaultValue={user.fullName}
                />
                <label>Date of birth:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="dateOfBirth"
                  defaultValue={user.dateOfBirth}
                />
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