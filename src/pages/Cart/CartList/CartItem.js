import { useRef } from "react";
import './CartList.scss';
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../../../actions/Cart";
function CartItem(props) {

    const { item } = props;
    const dispatch = useDispatch();
    const inputRef = useRef();
    const priceNew = (item.info.price * ((100 - item.info.discounted) / 100)).toFixed(0);

    const handleDown = () => {
        if (item.quantity > 1) {
            dispatch(updateItem(item.id, -1));
            inputRef.current.value = parseInt(inputRef.current.value) - 1;
        }
    }

    const handleUp = () => {
        dispatch(updateItem(item.id, 1));
        inputRef.current.value = parseInt(inputRef.current.value) + 1;
    }

    const handleDelete = () => {
        dispatch(deleteItem(item.id));
    }

    return (
        <>
            <div className="cart__item">
                <div className="cart__image">
                    <img src={item.info.imagePath} alt={item.info.product_name} />
                </div>
                <div className="cart__content">
                    <h3 className="cart__title">
                        {item.info.product_name}
                    </h3>
                    <div className="cart__price-new">
                        {priceNew}đ
                    </div>
                    <div className="cart__price-old">
                        {item.info.price}đ
                    </div>
                </div>
                <div className="cart__quantity">
                    <span onClick={handleDown}>-</span>
                    <input ref={inputRef} defaultValue={item.quantity} />
                    <span onClick={handleUp}>+</span>
                </div>
                <div className="cart__delete" onClick={handleDelete}>
                    Xóa
                </div>
            </div>
        </>
    );
}

export default CartItem;