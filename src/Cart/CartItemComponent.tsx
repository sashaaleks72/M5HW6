import { observer } from "mobx-react-lite";
import { cart } from "../App";
import classes from "./Cart.module.css";

type Props = {
    id: number;
    title: string;
    quantity: number;
    imageUrl: string;
    price: number;
};

const CartItemComponent = observer((props: Props): JSX.Element => {
    return (
        <div className={classes.cartItem}>
            <div className={classes.cartItemTitle}>{props.title}</div>
            <div className={classes.cartItemRow}>
                <div className={classes.cartItemImg}>
                    <img src={props.imageUrl} alt="cart-item" height={200} />
                </div>
                <div
                    className={classes.cartItemDec}
                    onClick={() => {
                        cart.decFromCart(props.id);
                    }}
                >
                    -
                </div>
                <div>{props.quantity}</div>
                <div
                    className={classes.cartItemAdd}
                    onClick={() => {
                        cart.addToCart(props.id);
                    }}
                >
                    +
                </div>
                <div>{props.price} UAH</div>
                <div
                    className={classes.cartItemRemove}
                    onClick={() => {
                        cart.delFromCart(props.id);
                    }}
                >
                    x
                </div>
            </div>
        </div>
    );
});

export default CartItemComponent;
