import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../../services/productsService";
import "./ManageProducts.scss";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [values, setValues] = useState({});
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProductList();
      setProducts(result);
    };
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setCreate(!create);
  };

  const handleQuitCreate = () => {
    setCreate(false);
  };

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    let options = {
      ...values,
      rating: 0,
      sold: 0,
    };


    const creatNewProduct = async () => {
      const result = await createProduct(options);
      if (result) {
        setProducts([...products, result]);
        setValues({});
        setCreate(false);
      }
    };
    creatNewProduct();
  };

  const handleDelete = async (productId) => {
    const resultOfDelete = await deleteProduct(productId);
    if (resultOfDelete) {
      const updatedProducts = products.filter(
        (product) => product.product_id !== productId
      );
      setProducts(updatedProducts);
    }
  };

  const handleOpenUpdate = (item) => {
    setFormData(item);
    setUpdate(true);
  };

  const handleQuitUpdate = () => {
    setUpdate(false);
  };

  const handleUpdate = async (e, productId) => {
    e.preventDefault();
    let options = {
      ...values,
      product_id: productId
    };
    const result = await updateProduct(options);
    if (result) {
      setUpdate(false);
      setValues({});
      navigate("/private/admin");
    }
  };

  return (
    <>
      <div className="products">
        <div
          className="products__main"
          style={create || update ? { filter: "blur(5px)" } : {}}
        >
          <h1>Products List</h1>
          <div className="products__options">
            <button onClick={handleOpenCreate}>Thêm</button>
          </div>
          <div className="products__table">
            <div className="products__table--header">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Team</th>
                    <th>Discount</th>
                    <th>Sold</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="products__table--content">
              <table>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.product_id}>
                      <td>{item.product_id}</td>
                      <td>{item.product_name}</td>
                      <td>{item.category ? "Giay" : "Ao"}</td>
                      <td>{item.price}</td>
                      <td>{item.team}</td>
                      <td>{item.discounted}</td>
                      <td>{item.sold}</td>
                      <td>
                        <button onClick={() => handleOpenUpdate(item)}>
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item.product_id)}>
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="products__create"
          style={{ display: create ? "" : "none" }}
        >
          <div className="products__create--quit">
            <button
              onClick={handleQuitCreate}
              style={{
                background: "#fff",
                border: "none",
                marginRight: "10px",
              }}
            >
              X
            </button>
          </div>
          <div className="products__create--table">
            <form onSubmit={handleCreate}>
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      <input onChange={handleChange} type="text" name="product_name" />
                    </td>
                  </tr>
                  <tr>
                    <td>Thumbnail:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="imagePath"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Category:</td>
                    <td>
                      <select onChange={handleChange} name="category">
                        <option defaultValue="default">Chọn danh mục</option>
                        <option value="0">Ao</option>
                        <option value="1">Giay</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>
                      <input onChange={handleChange} type="text" name="price" />
                    </td>
                  </tr>
                  <tr>
                    <td>Team:</td>
                    <td>
                      <input onChange={handleChange} type="text" name="team" />
                    </td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="discounted"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button style={{ marginLeft: "20px" }}>Create</button>
            </form>
          </div>
        </div>
        <div
          className="products__update"
          style={{ display: update ? "" : "none" }}
        >
          <div className="products__update--quit">
            <button
              onClick={handleQuitUpdate}
              style={{
                background: "#fff",
                border: "none",
                marginRight: "10px",
              }}
            >
              X
            </button>
          </div>
          <div className="products__update--table">
            <form onSubmit={(e) => handleUpdate(e,formData.product_id)}>
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="product_name"
                        defaultValue={formData.product_name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Thumbnail:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="imagePath"
                        defaultValue={formData.imagePath}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Category:</td>
                    <td>
                      <select
                        onChange={handleChange}
                        name="category"
                        
                      >
                        <option>Select</option>
                        <option value="0">Ao</option>
                        <option value="1">Giay</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="price"
                        defaultValue={formData.price}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Team:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="team"
                        defaultValue={formData.team}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="discounted"
                        defaultValue={formData.discounted}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button style={{ marginLeft: "20px" }}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageProducts;
