import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button";

export default function Cart(){
    const {items, addItem, removeItem} = useContext(CartContext);
    const {progress, hideCart, showCheckout}  =useContext(UserProgressContext);

    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    return <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart' ? hideCart : null}>
        <h2>Your Cart</h2>
        <ul>{items.map(item =>(
            <li key={item.id}>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
            <p className="cart-item-actions">
                <button onClick={() =>removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() =>addItem(item)}>+</button>
            </p>
            </li>
        ))}
            </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={hideCart} textOnly>Close</Button>
            {items.length > 0 && <Button onClick={showCheckout}>Checkout</Button>}
            
        </p>
    </Modal>
}