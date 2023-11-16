import { useEffect, useState } from "react";
import {
  deleteArticle,
  deleteArticleReaction,
  deleteComment,
  getApprovedArticle,
  getArticle,
  getArticleComments,
  getArticleReactions,
  getNonApprovedArticle,
  updateArticleStatus,
} from "../../../services/articlesService";
import "./ManageArticles.scss";
import { getNowDate } from "../../../helpers/getNowDate";

function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (status === "" || status === "default") {
        const result = await getArticle();
        setArticles(result);
      } else if (status === "approved") {
        const result = await getApprovedArticle();
        setArticles(result);
      } else if (status === "non-approved") {
        const result = await getNonApprovedArticle();
        setArticles(result);
      }
    };
    fetchArticle();
  }, [status]);

  const handleApprove = async (articleId) => {
    const timeAccept = getNowDate();
    let options = {
      status: 1,
      timeAccept: timeAccept,
    };

    const approvedArticle = await updateArticleStatus(articleId, options);
    if (approvedArticle) {
      alert("Duyệt thành công!");
    }
  };

  const handleCancelApprove = async (articleId) => {
    let options = {
      status: 0,
      timeAccept: "",
    };

    const nonApprovedArticle = await updateArticleStatus(articleId, options);
    if (nonApprovedArticle) {
      alert("Bỏ duyệt thành công!");
    }
  };

  const handleDelete = async (articleId) => {
    const resultDeleteArticle = await deleteArticle(articleId);

    const getCommentsToDelete = await getArticleComments(articleId);
    for (let i = 0; i < getCommentsToDelete.length; i++) {
      const delComment = await deleteComment(getCommentsToDelete[i].id);
      console.log(delComment);
    }

    const getReactionsToDelete = await getArticleReactions(articleId);
    for (let i = 0; i < getReactionsToDelete.length; i++) {
      const delReaction = await deleteArticleReaction(
        getReactionsToDelete[i].id
      );
      console.log(delReaction);
    }

    if (resultDeleteArticle) {
      const updatedArticles = articles.filter(
        (article) => article.id !== articleId
      );
      setArticles(updatedArticles);
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
                  <tr key={item.id}>
                    <td className="articles__id">{item.id}</td>
                    <td className="articles__name">{item.name}</td>
                    <td className="articles__desc">{item.description}</td>
                    <td className="articles__timesubmit">{item.timeSubmit}</td>
                    <td className="articles__status">
                      {item.status === 0 ? "Chưa duyệt" : "Đã duyệt"}
                    </td>
                    {item.status === 0 ? (
                      <>
                        <td>
                          <button onClick={() => handleApprove(item.id)}>
                            Duyệt
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <button onClick={() => handleCancelApprove(item.id)}>
                            Bỏ Duyệt
                          </button>
                        </td>
                      </>
                    )}
                    <td>
                      <button onClick={() => handleDelete(item.id)}>Xoá</button>
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
