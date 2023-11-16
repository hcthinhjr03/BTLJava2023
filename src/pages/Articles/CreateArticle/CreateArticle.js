import { useState } from "react";
import "./CreateArticle.scss";
import "../../../SCSS/base.scss";
import { creatArticle } from "../../../services/articlesService";
import { getCookie } from "../../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { getNowDate } from "../../../helpers/getNowDate";

function CreateArticle() {
  const [values, setValues] = useState({});
  const userId = getCookie("id");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedToday = getNowDate();

    let options = {
      ...values,
      status: 0,
      likes: 0,
      dislikes: 0,
      reports: 0,
      userId: userId,
      timeSubmit: formattedToday,
      timeAccept: ""
    };
    const fetchApi = async () => {
      const result = await creatArticle(options);
      if (result) {
        setValues({});
        navigate("/article")
      }
    };
    fetchApi();
  };

  return (
    <>
      <div className="create">
        <div className="create__wrap">
          <h2>Create Article</h2>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="title">Tiêu đề</label>
                  </td>
                  <td>
                    <input
                      className="create__input"
                      name="name"
                      type="text"
                      id="title"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="category">Danh mục</label>
                  </td>
                  <td>
                    <select
                      onChange={handleChange}
                      className="create__select"
                      name="category"
                      id="category"
                    >
                      <option defaultValue="default">Chọn danh mục</option>
                      <option value="math">Math</option>
                      <option value="history">History</option>
                      <option value="biology">Biology</option>
                      <option value="literature">Literature</option>
                      <option value="physics">Physics</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="thumbnail">Đường dẫn ảnh</label>
                  </td>
                  <td>
                    <input
                      className="create__input"
                      name="image"
                      type="text"
                      id="thumbnail"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="content">Mô tả</label>
                  </td>
                  <td>
                    <textarea
                      className="create__input"
                      name="description"
                      id="description"
                      rows={1}
                      onChange={handleChange}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="content">Nội dung</label>
                  </td>
                  <td>
                    <textarea
                      className="create__input"
                      name="content"
                      id="content"
                      rows={4}
                      onChange={handleChange}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="create__submit">
              <button>Đăng bài</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateArticle;
