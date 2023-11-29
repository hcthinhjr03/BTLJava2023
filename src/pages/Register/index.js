import { useNavigate } from "react-router-dom";
import * as users from "../../services/usersService";
import "./register.scss";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.elements.fullName.value;
    const dateOfBirth = e.target.elements.dateOfBirth.value;
    const gender = e.target.elements.gender.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const email = e.target.elements.email.value;

    const options = {
      full_name: fullName,
      user_name: username,
      pass_word: password,
      date_of_birth: dateOfBirth,
      gender: gender === '1' ? "true" : "false",
      email: email
    };

    const processRegister = await users.createUser(options);

    if(processRegister.VALID === 1){
      Swal.fire({
        title: 'Đăng ký thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } 
      });
    } else {
      for(let key in processRegister){
        if(processRegister[key] === 1){
          Swal.fire({
            title: (`${key}`),
            icon: 'error',
            confirmButtonText: 'OK'
          })
          break;
        }
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
            <label>Email:</label>
                <input
                  className="register__input"
                  type="email"
                  name="email"
                  placeholder="Email"
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
              placeholder="Date of birth: dd/mm/yyyy"
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
