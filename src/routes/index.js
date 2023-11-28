import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoutes from "../components/PrivateRoutes";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Articles from "../pages/Articles";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import ArticleDetail from "../pages/Articles/ArticleDetail/ArticleDetail";
import CreateArticle from "../pages/Articles/CreateArticle/CreateArticle";
import Cart from "../pages/Cart";
import Gift from "../pages/Gift";
import DashBoard from "../pages/Admin/Dashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageArticles from "../pages/Admin/ManageArticles";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageOrders from "../pages/Admin/ManageOrders";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "article",
        element: <Articles />,
      },
      {
        path: "article/:id",
        element: <ArticleDetail />,
      },
      {
        path: "article/create",
        element: <CreateArticle />,
      },
      {
        path: "product",
        element: <Products />
      },
      {
        path: "product/cart",
        element: <Cart />
      },
      {
        path: "product/gift",
        element: <Gift />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  },
  {
    path: "/private",
    element: <PrivateRoutes />,
    children: [
      {
        path: "admin",
        element: <Admin/>,
        children: [
          {
            index: true,
            element: <DashBoard/>
          },
          {
            path: "users",
            element: <ManageUsers />
          },
          {
            path: "articles",
            element: <ManageArticles />
          },
          {
            path: "products",
            element: <ManageProducts />
          },
          {
            path: "orders",
            element: <ManageOrders/>
          },
          {
            path: "*",
            element: <Navigate to="/admin" />
          },
          {
            path: "logout",
            element: <Logout/>
          }
        ]
      }
    ]
  }
  
];