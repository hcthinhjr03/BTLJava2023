import { useEffect, useState } from "react";
import {
  deleteAllCommentsOfArticle,
  deleteAllReactionsOfArticle,
  deleteArticle,
  getApprovedArticle,
  getArticle,
  getNonApprovedArticle,
  updateArticle,
} from "../../../services/articlesService";
import "./ManageArticles.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function ManageArticles() {
  const userId = getCookie("user_id");
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      if (status === "" || status === "default") {
        const result = await getArticle();
        setArticles(result);
      } else if (status === "approved") {
        const result = await getApprovedArticle();
        setArticles(result);
      } else if (status === "non-approved") {
        const result = await getNonApprovedArticle(userId);
        setArticles(result);
      }
    };
    fetchArticle();
  }, [status, userId]);

  const handleApprove = async (articleId) => {

    let options = {
      stt: true,
      articleId: articleId
    };

    const approvedArticle = await updateArticle(options);
    if (approvedArticle) {
      //alert("Duyệt thành công!");
      Swal.fire({
        title: 'Duyệt thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/private/admin")
        } 
      });
    }
  };

  const handleCancelApprove = async (articleId) => {
    let options = {
      stt: false,
      articleId: articleId
    };

    const nonApprovedArticle = await updateArticle(options);
    if (nonApprovedArticle) {
      //alert("Bỏ duyệt thành công!");
      Swal.fire({
        title: 'Bỏ duyệt thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/private/admin")
        } 
      });
    }
  };

  const handleDelete = async (articleId) => {
    
    const deleteAllComments = await deleteAllCommentsOfArticle(articleId);
    console.log(deleteAllComments);

    const deleteAllReactions = await deleteAllReactionsOfArticle(articleId);
    console.log(deleteAllReactions);
    
    const resultDeleteArticle = await deleteArticle(userId, articleId);

    if (resultDeleteArticle) {
      Swal.fire({
        title: 'Xoá thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/private/admin")
        } 
      });
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <>
      <div className="articles">
        <h1>Articles List</h1>
        <div className="articles__options">
          <select name="status" onChange={handleChange}>
            <option def="true" value="default">
              All
            </option>
            <option value="approved">Đã duyệt</option>
            <option value="non-approved">Chưa duyệt</option>
          </select>
        </div>
        <div className="articles__table">
          <div className="articles__table--header">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Time Submit</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Delete</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="articles__table--content">
            <table>
              <tbody>
                {articles.map((item) => (
                  <tr key={item.articleId}>
                    <td className="articles__id">{item.articleId}</td>
                    <td className="articles__name">{item.articleName}</td>
                    <td className="articles__desc">{item.articleDescription}</td>
                    <td className="articles__timesubmit">{item.timeSubmit}</td>
                    <td className="articles__status">
                      {item.stt === false ? "Chưa duyệt" : "Đã duyệt"}
                    </td>
                    {item.stt === false ? (
                      <>
                        <td>
                          <button onClick={() => handleApprove(item.articleId)}>
                            Duyệt
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <button onClick={() => handleCancelApprove(item.articleId)}>
                            Bỏ Duyệt
                          </button>
                        </td>
                      </>
                    )}
                    <td>
                      <button onClick={() => handleDelete(item.articleId)}>Xoá</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageArticles;
