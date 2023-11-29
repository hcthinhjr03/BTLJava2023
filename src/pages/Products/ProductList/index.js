import { useEffect, useState } from "react";
import {
  getProductListByCategory,
} from "../../../services/productsService";
import ProductItem from "./ProductItem";
import { FaShoppingCart, FaGift } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ProductList() {
  const navigate = useNavigate();
  const authen = useSelector((state) => state.authenReducer);
  const cart = useSelector(state => state.cartReducer);
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleChange = async (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (category === "" || category === "default") {
        const result = await getProductListByCategory({});
        setProducts(result);
      } else {
        const filters = {
          category: -1
        }
        if (category === "Ao") {
          filters.category = 0;
        }
        if (category === "Giay") {
          filters.category = 1;
        }
        const result = await getProductListByCategory(filters);
        setProducts(result);
      }
    };
    fetchApi();
  }, [currentPage, category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleGift = () => {
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
      navigate("/product/gift");
    }
  }

  const handleCart = () => {
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
      navigate("/product/cart");
    }
  };

  return (
    <>
      <div className="product__options">
        <select
          aria-label="label for the select"
          style={{ margin: "15px 5px" }}
          className="button button-main button-select"
          name="category"
          onChange={handleChange}
        >
          <option def="true" value="default">
            All
          </option>
          <option value="Ao">Ao</option>
          <option value="Giay">Giay</option>
        </select>
        <div className="product__btn">
        <button onClick={handleGift} className="product__gift">
          <FaGift />
          <span style={{ marginLeft: "5px", fontSize: "16px" }}>Redeem Vouchers</span>
        </button>
        <button onClick={handleCart} className="product__cart">
          <FaShoppingCart />
          <span style={{ marginLeft: "5px", fontSize: "16px" }}>Cart ({total})</span>
        </button>
        </div>
      </div>

      {currentProducts.length > 0 && (
        <div>
          <div className="product__list">
            {currentProducts.map((item) => (
              <ProductItem item={item} key={item.product_id} />
            ))}
          </div>
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

export default ProductList;
