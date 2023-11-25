import { BsFillCartPlusFill } from "react-icons/bs";
import "./ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add, updateItem } from "../../../actions/Cart";
import Swal from "sweetalert2";

function ProductItem(props) {
  const { item } = props;

  const authen = useSelector((state) => state.authenReducer);
  const cart = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priceNew = (item.price * ((100 - item.discounted) / 100)).toFixed(0);

  const handleAddToCart = () => {
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
      if (cart.some((itemCart) => itemCart.id === item.id)) {
        dispatch(updateItem(item.id, 1));
      } else {
        dispatch(add(item.id, item));
      }
    }
  };

  return (
    <>
      <div className="product__item">
        <div className="product__box">
          <div className="product__image">
            <img src={item.imagePath} alt={item.product_name} />
          </div>
          <div className="product__content">
            <h3 className="product__title">{item.product_name}</h3>
            <div className="product__price-new">{priceNew}$</div>
            <div className="product__price-old">{item.price}$</div>
          </div>
          <div className="product__percent">-{item.discounted}%</div>
          <div className="product__button">
            <button onClick={handleAddToCart}>
              <BsFillCartPlusFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
