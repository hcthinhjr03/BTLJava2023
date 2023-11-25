import * as users from "../../services/usersService";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";
import "./login.scss";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const loginOptions = {
      user_name: username,
      pass_word: password
    }

    const data = await users.getUser(loginOptions);
    console.log(data);
    if (data.length > 0) {
      const time = 1;
      setCookie("id", data[0].id, time);
      setCookie("fullName", data[0].fullName, time);
      setCookie("username", data[0].username, time);
      setCookie("role", data[0].role, time);
      setCookie("token", data[0].token, time);
      dispatch(checkAuthen(true));
      // navigate("/");
      if (data[0].role === 2) {
        navigate("/private/admin"); // Redirect to the admin page
      } else {
        navigate("/"); // Redirect to the home page for regular users
      }
    } else {
      // alert("Tài khoản hoặc mật khẩu không chính xác!");
      Swal.fire({
        title: 'Tài khoản hoặc mật khẩu không chính xác!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__wrap">
          <h3 className="login__title">Login</h3>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              className="login__input"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <label>Password:</label>
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
