import { BsFillCartPlusFill } from "react-icons/bs";
import "./ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add, updateItem } from '../../../actions/Cart';

function ProductItem(props) {
    const { item } = props;

    const authen = useSelector((state) => state.authenReducer);
    const cart = useSelector(state => state.cartReducer);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const priceNew = (item.price * ((100 - item.discount) / 100)).toFixed(0);

    const handleAddToCart = () => {
        if (!authen) {
            navigate("/login");
        } else {
            if (cart.some(itemCart => itemCart.id === item.id)) {
                dispatch(updateItem(item.id, 1));
            } else {
                dispatch(add(item.id, item));
            }
        }
    }

    return (
        <>
         <div className="product__item">
                <div className="product__box">
                    <div className="product__image">
                        <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="product__content">
                        <h3 className="product__title">
                            {item.name}
                        </h3>
                        <div className="product__price-new">
                            {priceNew}$
                        </div>
                        <div className="product__price-old">
                            {item.price}$
                        </div>
                    </div>
                    <div className="product__percent">
                        -{item.discount}%
                    </div>
                    <div className="product__button">
                        <button onClick={handleAddToCart}><BsFillCartPlusFill /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem;