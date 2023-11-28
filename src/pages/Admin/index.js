import { Link, Outlet } from "react-router-dom";
import "./Admin.scss";
import { useState } from "react";
import {
  FaBars,
  FaChartBar,
  FaUserEdit,
  FaNewspaper,
  FaStore,
} from "react-icons/fa";

function Admin() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="admin">
        <header className="admin__header">
          <div className="admin__header--wrap">
            <div className="admin__header--logo">
              <button onClick={toggleSidebar}>
                <FaBars />
              </button>
              <span>TEAM12</span>
            </div>
            <div className="admin__header--logout">
              <Link to="/logout">Logout</Link>
            </div>
          </div>
        </header>
        <div className="admin__section">
          {isSidebarVisible && (
            <div className="admin__sidebar">
              <ul>
                <li>
                  <Link to="/private/admin">Dashboard</Link>
                  <FaChartBar />
                </li>
                <li>
                  <Link to="/private/admin/users">Users</Link>
                  <FaUserEdit />
                </li>
                <li>
                  <Link to="/private/admin/articles">Articles</Link>
                  <FaNewspaper />
                </li>
                <li>
                  <Link to="/private/admin/products">Products</Link>
                  <FaStore />
                </li>
                <li>
                  <Link to="/private/admin/orders">Orders</Link>
                  <FaStore />
                </li>
                <li style={{height: "400px"}}></li>
              </ul>
            </div>
          )}
          <div className="admin__main" style={{ width: isSidebarVisible ? "" : "100%" }}>
            <Outlet
              
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
