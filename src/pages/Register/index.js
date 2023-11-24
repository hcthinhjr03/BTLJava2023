import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import * as users from "../../services/usersService";
import "./register.scss";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.elements.fullName.value;
    const dateOfBirth = e.target.elements.dateOfBirth.value;
    const gender = e.target.elements.gender.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const token = generateToken();

    const options = {
      fullName: fullName,
      username: username,
      password: password,
      token: token,
      role: 0,
      dateOfBirth: dateOfBirth,
      gender: gender,
      score_to_award: 0,
      // image: "",
      // address: "",
      // date_of_birth: "",
      // favor_fc: "",
      // likes: 0,
      // dislikes: 0,
      // score_to_award: 0,
    };

    const checkExist = await users.getUser(username);

    if (checkExist.length > 0) {
      alert("Tài khoản đã tồn tại!");
    } else {
      const result = await users.createUser(options);
      if (result) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="register__wrap">
          <h3 className="register__title">Register</h3>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              className="register__input"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <label>Password:</label>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <label>FullName:</label>
            <input
              className="register__input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />
            <label>Gender:</label>
            <select name="gender" className="register__select">
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>

            <label>Date of birth:</label>
            <input
              className="register__input"
              type="text"
              name="dateOfBirth"
              placeholder="Date of birth"
              required
            />

            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
