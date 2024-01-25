import { useContext } from "react"
import { CartContext } from "../../store/CartContext"
import { UserProgressContext } from "../../store/UserProgressContext"
import { currencyFormatter } from "../../util/formatting"
import Input from "./Input"
import Modal from "./Modal";
import Button from "./Button"
export default function Checkout(){

    const {items} = useContext(CartContext)
    const {progress, hideCheckout} = useContext(UserProgressContext)
    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleSubmit(event){
      
        event.preventDefault();

        // Here we need the name for all inputs
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        console.log(data)
        event.target.reset();
    }

    return <Modal open={progress === 'checkout'} onClose={hideCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="full-name" />
            <Input label="E-mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={hideCheckout}>Close</Button>
                <Button textOnly>Submit Order</Button>
            </p>
        </form>
        
    </Modal>
}