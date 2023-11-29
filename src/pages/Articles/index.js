import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import "./article.scss";
import {
  getArticleByCategory,
  getNewestArticle,
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
        const result = await getNewestArticle();
        setArticle(result);
      } else {
        const result = await getArticleByCategory(category);
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
      Swal.fire({
        title: "Bạn phải đăng nhập!",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate(`/article/${id}`);
    }
  };

  const userRole = getCookie("role");

  const handleCreate = () => {
    if (!authen) {
      Swal.fire({
        title: "Bạn phải đăng nhập!",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      if (parseInt(userRole) === 1) {
        navigate("/article/create");
      } else {
        Swal.fire({
          title: 'Bạn chưa đủ điểm để có thể đăng bài',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        // alert("Bạn chưa đủ điểm để có thể đăng bài");
      }
    } 
  };
  return (
    <>
      <h2>Articles</h2>
      <div className="options">
        <button
          className="button button-main button-create"
          onClick={handleCreate}
        >
          Post
        </button>
        <select
          className="button button-main button-select"
          name="category"
          onChange={handleChange}
        >
          <option def="true" value="default">
            All
          </option>
        
          <option value="qa">Q&A</option>
          <option value="vleague">V-League</option>
          <option value="scout">Scout cầu thủ trẻ</option>
          <optgroup label="League">
            <option value="epl">EPL</option>
            <option value="laliga">LaLiga</option>
            <option value="seriea">Serie A</option>
            <option value="bundesliga">Bundesliga</option>
            <option value="league1">League 1</option>
            <option value="other">Another</option>
          </optgroup>
          <optgroup label="Cup Châu Âu">
            <option value="c1">C1</option>
            <option value="c2">C2</option>
            <option value="c3">C3</option>
          </optgroup>
          <optgroup label="Đội tuyển quốc gia">
            <option value="vn">Việt Nam</option>
            <option value="national">Đội tuyển khác</option>
          </optgroup>
          <optgroup label="Chuyển nhượng">
            <option value="transfer_vn">Bóng đá Việt Nam</option>
            <option value="transfer">Bóng đá ngoại</option>
          </optgroup>
        </select>
      </div>
      {article.length > 0 && (
        <div className="inner-wrap">
          {currentArticles.map((item) => (
            <div className="inner-box" key={item.articleId}>
              <div className="inner-image">
                <img src={item.image} alt="" />
              </div>
              <div className="inner-content">
                <div className="inner-title">{item.articleName}</div>
                <div className="inner-desc">{item.articleDescription}</div>
                <button
                  className="button button-main"
                  onClick={() => handleClick(item.articleId)}
                >
                  Details
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
