import { useEffect, useState } from "react";
import "./article.scss";
import {
  getApprovedArticle,
  getApprovedArticleByCategory,
} from "../../services/articlesService";
import { FaHeart, FaThumbsDown, FaFlag } from "react-icons/fa";
import "../../SCSS/base.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function Article() {
  const authen = useSelector((state) => state.authenReducer);
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const [category, setCategory] = useState("");

  const handleChange = async (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (category === "" || category === "default") {
        const result = await getApprovedArticle();
        setArticle(result);
      } else {
        const result = await getApprovedArticleByCategory(category);
        setArticle(result);
      }
    };
    fetchApi();
  }, [currentPage, category]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = article.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(article.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (id) => {
    if (!authen) {
      navigate("/login");
    } else {
      navigate(`/article/${id}`);
    }
  };

  const userRole = getCookie("role");

  const handleCreate = () => {
    if (!authen) {
      navigate("/login");
    } else {
      if (parseInt(userRole) === 1) {
        navigate("/article/create");
      } else {
        alert("Bạn chưa đủ điểm để có thể đăng bài");
      }
    } 
  };
  return (
    <>
      <h2>Danh sách bài viết</h2>
      <div className="options">
        <button
          className="button button-main button-create"
          onClick={handleCreate}
        >
          Đăng bài
        </button>
        <select
          className="button button-main button-select"
          name="category"
          onChange={handleChange}
        >
          <option def="true" value="default">
            All
          </option>
          <option value="math">Math</option>
          <option value="literature">Literature</option>
          <option value="history">History</option>
          <option value="physics">Physics</option>
          <option value="biology">Biology</option>
        </select>
      </div>
      {article.length > 0 && (
        <div className="inner-wrap">
          {currentArticles.map((item) => (
            <div className="inner-box" key={item.id}>
              <div className="inner-image">
                <img src={item.image} alt="" />
              </div>
              <div className="inner-content">
                <div className="inner-title">{item.name}</div>
                <div className="inner-desc">{item.description}</div>
                <button
                  className="button button-main"
                  onClick={() => handleClick(item.id)}
                >
                  Xem chi tiết
                </button>
                <div className="inner-info">
                  <div className="inner-reaction">
                    <div className="inner-like">
                      <div className="inner-icon__heart">
                        <FaHeart />
                      </div>
                      <div className="inner-number">{item.likes}</div>
                    </div>
                    <div className="inner-dislike">
                      <div className="inner-icon__dislike">
                        <FaThumbsDown />
                      </div>
                      <div className="inner-number">{item.dislikes}</div>
                    </div>
                    <div className="inner-report">
                      <div className="inner-icon__report">
                        <FaFlag />
                      </div>
                      <div className="inner-number">{item.reports}</div>
                    </div>
                  </div>
                  <div className="inner-time">Ngày tạo: {item.timeAccept}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="inner-paginate">
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
      )}
    </>
  );
}

export default Article;
