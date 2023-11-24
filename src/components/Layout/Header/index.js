import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import "../../../SCSS/base.scss";
import { getCookie } from "../../../helpers/cookie";
import { useSelector } from "react-redux";


function Header() {
  const token = getCookie("token");
  const authen = useSelector((state) => state.authenReducer);

  return (
    <>
      <header className="header">
        <div className="header__top">
          {/* <div className="container"> */}
            <div className="header__wrap">
              <div className="header__logo">
                <Link to="/">TEAM12</Link>
              </div>
              <div className="header__account">
                <ul>
                  {token && authen ? (
                    <>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                          <Link to="/logout">
                            <div className="button button-main">Logout</div>
                          </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/login">
                          <div className="button button-main">Login</div>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/register">
                          <div className="button button-extra">Register</div>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          {/* </div> */}
        </div>
        <div className="header__bot">
          <div className="container">
              <div className="header__menu">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/article">News</NavLink>
                  </li>
                  <li>
                    <NavLink to="/product">Products</NavLink>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
