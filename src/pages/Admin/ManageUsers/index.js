import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUser,
  getEmail,
  updateUser,
} from "../../../services/usersService";
import "./ManageUsers.scss";


function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({});
  //const [values, setValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUser();
      setUsers(result);
    };
    fetchUsers();
  }, []);

  // const handleChange = (e) => {
  //   setValues((values) => ({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleOpenUpdate = (item) => {
    setFormData(item);
    setUpdate(true);
  };

  const handleQuitUpdate = () => {
    setUpdate(false);
  };

  const handleUpdate = async (e, userId) => {
    e.preventDefault();
    let optionEmail = {
      user_id: userId
    }

    const resultEmail = await getEmail(optionEmail);

    const full_name = e.target.elements.full_name.value;
    const user_name = e.target.elements.user_name.value;
    const date_of_birth = e.target.elements.date_of_birth.value;
    const user_role = e.target.elements.user_role.value;
    //const gender = e.target.elements.gender.value;
    const score_to_award = e.target.elements.score_to_award.value;

    let options = {
      // ...values,
      user_id: formData.user_id,
      detail_position: formData.detail_position,
      avatar_image_path: formData.avatar_image_path,
      favor_fc: formData.Favor_fc,
      email : resultEmail.email,
      phone_number : "123456789",
      country : "",
      city : "",
      district : "",
      description_text : "",
      full_name: full_name,
      user_name: user_name,
      date_of_birth: date_of_birth,
      user_role: user_role,
      gender: formData.gender,
      score_to_award: score_to_award
    };

    const result = await updateUser(options);
    if (result) {
      setUpdate(false);
      // setValues({});
      navigate("/private/admin");
    }
  };

  const handleDelete = async (userId) => {
    // Updating........

    // const resultDeleteUser = await deleteUser(userId);

    // const getCommentsToDelete = await getCommentsOfUser(userId);
    // for (let i = 0; i < getCommentsToDelete.length; i++) {
    //   const delComment = await deleteComment(getCommentsToDelete[i].id);
    //   console.log(delComment);
    // }

    // const getReactionsToDelete = await getReactionsOfUser(userId);
    // for (let i = 0; i < getReactionsToDelete.length; i++) {
    //   const delReaction = await deleteArticleReaction(
    //     getReactionsToDelete[i].id
    //   );
    //   console.log(delReaction);
    // }

    // const getVouchersToDelete = await getVouchersOfUser(userId);
    // for (let i = 0; i < getVouchersToDelete.length; i++) {
    //   const delVoucher = await deleteHasVoucher(getVouchersToDelete[i].id);
    //   console.log(delVoucher);
    // }

    // const getEmailToDelete = await getEmail(userId);
    // const delEmail = await deleteEmail(getEmailToDelete[0].id);
    // console.log(delEmail);

    // const getPhoneToDelete = await getPhone(userId);
    // const delPhone = await deletePhone(getPhoneToDelete[0].id);
    // console.log(delPhone);

    // if (resultDeleteUser) {
    //   const updatedUsers = users.filter((user) => user.id !== userId);
    //   setUsers(updatedUsers);
    // }
  };

  return (
    <>
      <div className="users">
        <h1>Users List</h1>
        <div
          className="users__main"
          style={update ? { filter: "blur(5px)" } : {}}
        >
          <div className="users__table">
            <div className="users__table--header">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Role</th>
                    <th>UserName</th>
                    <th>FullName</th>
                    <th>Date Of Birth</th>
                    {/* <th>Gender</th> */}
                    <th>Score</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="users_table--content">
              <table>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.user_id}>
                      <td>{item.user_id}</td>
                      <td>
                        {item.user_role === 2 ? "Quản trị viên" : "Người dùng"}
                      </td>
                      <td>{item.user_name}</td>
                      <td>{item.full_name}</td>
                      <td>{item.date_of_birth}</td>
                      {/* <td>{item.gender ? "Nam" : "Nữ"}</td> */}
                      <td>{item.score_to_award}</td>
                      <td>
                        <button onClick={() => handleOpenUpdate(item)}>
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item.user_id)}>
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="users__update"
          style={{ display: update ? "" : "none" }}
        >
          <div className="users__update--quit">
            <button
              onClick={handleQuitUpdate}
              style={{
                background: "#fff",
                border: "none",
                marginRight: "10px",
              }}
            >
              X
            </button>
          </div>
          <div className="users__update--table">
            <form onSubmit={(e) => handleUpdate(e, formData.user_id)}>
              <table>
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td>
                      <input
                        //onChange={handleChange}
                        type="text"
                        name="user_name"
                        defaultValue={formData.user_name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>
                      <input
                        //onChange={handleChange}
                        type="text"
                        name="user_role"
                        defaultValue={formData.user_role}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Fullname:</td>
                    <td>
                      <input
                        //onChange={handleChange}
                        type="text"
                        name="full_name"
                        defaultValue={formData.full_name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date of birth:</td>
                    <td>
                      <input
                        //onChange={handleChange}
                        type="text"
                        name="date_of_birth"
                        defaultValue={formData.date_of_birth}
                      />
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Gender:</td>
                    <td>
                      <select
                        //onChange={handleChange}
                        name="gender"
                        // value={formData.gender}
                      >
                        <option value="def">Select</option>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                      </select>
                    </td>
                  </tr> */}
                  <tr>
                    <td>Score:</td>
                    <td>
                      <input
                        //onChange={handleChange}
                        type="text"
                        name="score_to_award"
                        defaultValue={formData.score_to_award}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button style={{ marginLeft: "20px" }}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
