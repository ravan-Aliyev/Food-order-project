import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./CartButton.module.css";
import CartContext from "../../store/cart-context";

const CartButton = function (props) {
  const [bumpAni, setBumpAni] = useState(false);
  const ctx = useContext(CartContext);
  const numberOfCartItems = new Set(ctx.items).size;

  // const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  const btnClasses = `${styles.button} ${bumpAni ? styles.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) return;
    setBumpAni(true);

    const animation = setTimeout(() => {
      setBumpAni(false);
    }, 300);

    return () => {
      clearTimeout(animation);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
