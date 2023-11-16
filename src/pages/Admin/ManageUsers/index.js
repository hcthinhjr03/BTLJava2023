import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUser,
  getCommentsOfUser,
  getReactionsOfUser,
  getVouchersOfUser,
  updateUser,
} from "../../../services/usersService";
import "./ManageUsers.scss";
import {
  deleteArticleReaction,
  deleteComment,
} from "../../../services/articlesService";
import { deleteHasVoucher } from "../../../services/productsService";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUser();
      setUsers(result);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenUpdate = (item) => {
    setFormData(item);
    setUpdate(true);
  };

  const handleQuitUpdate = () => {
    setUpdate(false);
  };

  const handleUpdate = async (userId) => {
    let options = {
      ...values,
    };
    const result = await updateUser(userId, options);
    if (result) {
      setUpdate(false);
      setValues({});
    }
  };

  const handleDelete = async (userId) => {
    const resultDeleteUser = await deleteUser(userId);

    const getCommentsToDelete = await getCommentsOfUser(userId);
    for (let i = 0; i < getCommentsToDelete.length; i++) {
      const delComment = await deleteComment(getCommentsToDelete[i].id);
      console.log(delComment);
    }

    const getReactionsToDelete = await getReactionsOfUser(userId);
    for (let i = 0; i < getReactionsToDelete.length; i++) {
      const delReaction = await deleteArticleReaction(
        getReactionsToDelete[i].id
      );
      console.log(delReaction);
    }

    const getVouchersToDelete = await getVouchersOfUser(userId);
    for (let i = 0; i < getVouchersToDelete.length; i++) {
      const delVoucher = await deleteHasVoucher(getVouchersToDelete[i].id);
      console.log(delVoucher);
    }

    if (resultDeleteUser) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    }
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
                    <th>Gender</th>
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
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        {item.role === 2 ? "Quản trị viên" : "Người dùng"}
                      </td>
                      <td>{item.username}</td>
                      <td>{item.fullName}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{parseInt(item.gender) === 1 ? "Nam" : "Nữ"}</td>
                      <td>{item.score_to_award}</td>
                      <td>
                        <button onClick={() => handleOpenUpdate(item)}>
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>
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
            <form onSubmit={() => handleUpdate(formData.id)}>
              <table>
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        defaultValue={formData.username}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="role"
                        defaultValue={formData.role}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Fullname:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="fullName"
                        defaultValue={formData.fullName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date of birth:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="dateOfBirth"
                        defaultValue={formData.dateOfBirth}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>
                      <select
                        onChange={handleChange}
                        name="gender"
                        defaultValue={formData.gender}
                      >
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Score:</td>
                    <td>
                      <input
                        onChange={handleChange}
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
