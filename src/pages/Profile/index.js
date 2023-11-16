import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getUserById, updateUser } from "../../services/usersService";
import "./profile.scss"

function Profile() {
  const id = getCookie("id");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUserById(id);
      setUser(result[0]);
    };
    fetchApi();
  }, [id]);

  console.log(user);
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
        dateOfBirth: dateOfBirth
    }

    const result = await updateUser(id, options);
    console.log(result)
  }

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
            <div className="profile__gender">Giới tính: {user.gender === 1 ? "Nam" : "Nữ"}</div>
          </div>
          <div className="profile__right">
            <div className="profile__form">
              <form onSubmit={handleSubmit}>
              <label>Full Name:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="fullName"
                  placeholder={user.fullName || "none"}
                />
                <label>Date of birth:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="dateOfBirth"
                  placeholder={user.dateOfBirth || "none"}
                />
                <label>Avatar:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="image"
                  placeholder={user.image || "none"}
                />
                <label>Address:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="address"
                  placeholder={user.address || "none"}
                />
                <label>Favorite FC:</label>
                <input
                  className="profile__input"
                  type="text"
                  name="favor_fc"
                  placeholder={user.favor_fc || "none"}
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
