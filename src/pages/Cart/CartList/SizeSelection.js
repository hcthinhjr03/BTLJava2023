import { useState } from 'react';
import Modal from 'react-modal';
import "./CartList.scss";




function SizeSelection({ isOpen, onRequestClose, cart, style, onConfirm }) {

    const [seclectedSize, setSeclectedSize] = useState({});
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    let subtitle;

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    const handleSizeChange = (productId, size) => {
        setSeclectedSize((prevSeclectedSize) => ({ ...prevSeclectedSize, [productId]: size }));
    }

    const handleChangeAddress = (address) => {
        setAddress(address);
    }

    const handleChangePhone = (phone) => {
        setPhone(phone);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const productsInOrder = cart.map((item) => ({
            product_id: item.info.product_id,
            size: seclectedSize[item.info.product_id],
            nametag: "abc",
            color: "abc",
            squad_number: 123,
            quantity: item.quantity
        }))

        onConfirm(productsInOrder, address, phone);
        onRequestClose();

    }

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} onAfterOpen={afterOpenModal} style={style}>
                <div className='modal'>
                    <div style={{textAlign: "center"}}>
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Confirm Order</h2>
                    </div>
                    <div className='modal__options'>
                        <button onClick={onRequestClose}>close</button>
                    </div>
                    <div className='modal__main'>
                        <form onSubmit={handleSubmit}>
                            <div className='modal__table'>
                                <div className='modal__table--header'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Size</th>
                                                <th>Quantity</th>
                                            </tr>

                                        </thead>
                                    </table>
                                </div>
                                <div className='modal__table--content'>
                                    <table>
                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.id}>
                                                    <td><label>{item.info.product_name}</label></td>
                                                    <td>
                                                        <select onChange={(e) => handleSizeChange(item.info.product_id, e.target.value)}>
                                                            <option value='0'>S</option>
                                                            <option value='1'>M</option>
                                                            <option value='2'>L</option>
                                                            <option value='3'>XL</option>
                                                            <option value='4'>XXL</option>
                                                        </select>
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='modal__input'>
                                <label>Address:</label>
                                <input type='text' onChange={(e) => handleChangeAddress(e.target.value)} />
                            </div>
                            <div className='modal__input'>
                                <label>Phone Number:</label>
                                <input type='text' onChange={(e) => handleChangePhone(e.target.value)} />
                            </div>
                            <div className='modal__btn'>                               
                                <button type='submit'>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default SizeSelection;