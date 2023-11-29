import { useState } from "react";
import "./CreateArticle.scss";
import "../../../SCSS/base.scss";
import { creatArticle } from "../../../services/articlesService";
import { getCookie } from "../../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateArticle() {
  const [values, setValues] = useState({});
  const userId = getCookie("user_id");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    let options = {
      ...values,
      userId: userId,

    };
    const fetchApi = async () => {
      const result = await creatArticle(options);
      if (result) {
        Swal.fire({
          title: 'Đăng bài thành công! Bài viết của bạn sẽ sớm được duyệt!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {      
            setValues({});
            navigate("/article")
          } 
        });
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
                      name="articleName"
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
                      name="articleCategory"
                      id="category"
                    >
                      
                      <option def="true" value="qa">Q&A</option>
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
                    <label htmlFor="articleDescription">Mô tả</label>
                  </td>
                  <td>
                    <textarea
                      className="create__input"
                      name="articleDescription"
                      id="articleDescription"
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
