import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = function (props) {
  const [openForm, setOpenForm] = useState(false);
  const [isSubmiting, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount?.toFixed(2)}`;
  const hasItems = ctx.items?.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const checkoutHandler = () => {
    setOpenForm(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true);
    await fetch(
      "https://costom-hooks-learning-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmit(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items?.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModal = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {openForm && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!openForm && modalActions}
    </>
  );

  const isSubmitingModalContent = <p>Sending order data..</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModal}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmit && <p>Order confirmed</p>}
    </Modal>
  );
};

export default Cart;
