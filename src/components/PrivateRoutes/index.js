import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoutes() {
  const role = getCookie("role");

  return (
    <>
      {role === '2' ? (<Outlet />) : (<Navigate to="/" />)}
    </>
  )
}

export default PrivateRoutes;