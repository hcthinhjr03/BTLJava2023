import { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
  HiMiniUserGroup,
  HiMiniNewspaper,
  HiCheckBadge,
  HiMiniShoppingCart,
} from "react-icons/hi2";
import { getApprovedArticle, getArticle } from "../../../services/articlesService";
import { getAllUser } from "../../../services/usersService";
import { getProductList } from "../../../services/productsService";

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);  
  const [approvedArticles, setApprovedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchApprovedArticles = async () => {
      const result = await getApprovedArticle();
      setApprovedArticles(result);
    };
    fetchApprovedArticles();
  }, [currentPage]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentApprovedArticles = approvedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const pageNumbers = [];

  for (let i = 1;i <= Math.ceil(approvedArticles.length / articlesPerPage);i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchArticles = async () => {
        const result = await getArticle();
        setArticles(result);
    }
    fetchArticles();
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
        const result = await getAllUser();
        setUsers(result);
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
        const result = await getProductList();
        setProducts(result);
    }
    fetchProducts();
  }, [])

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__section1"></div>
        <div className="dashboard__section2">
          <div className="dashboard__info">
            <div className="dashboard__box">
              <div className="dashboard__title">
                <span>Users</span> <HiMiniUserGroup />
              </div>
              <div className="dashboard__qty">{users.length}</div>
            </div>
            <div className="dashboard__box">
              <div className="dashboard__title">
                <span>Articles</span>
                <HiMiniNewspaper />
              </div>
              <div className="dashboard__qty">{articles.length}</div>
            </div>
            <div className="dashboard__box">
              <div className="dashboard__title">
                <span>Approved Articles</span>
                <HiCheckBadge />
              </div>
              <div className="dashboard__qty">{approvedArticles.length}</div>
            </div>
            <div className="dashboard__box">
              <div className="dashboard__title">
                <span>Active Products</span>
                <HiMiniShoppingCart />
              </div>
              <div className="dashboard__qty">{products.length}</div>
            </div>
          </div>
        </div>
        <div className="dashboard__section3">
          <div className="dashboard__wrap">
            <div style={{ fontSize: "24px", padding: "20px" }}>
              Approved Articles
            </div>
            <div className="dashboard__table">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApprovedArticles.map((item) => (
                  
                      <tr key={item.articleId}>
                        <td>{item.articleId}</td>
                        <td>{item.articleName}</td>
                        <td style={{ color: "blue" }}>{item.likes}</td>
                        <td style={{ color: "red" }}>{item.dislikes}</td>
                      </tr>
                    
                 ))}
                </tbody>
              </table>
            </div>
            <div className="dashboard__paginate">
              <ul>
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button onClick={() => setCurrentPage(number)}>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
