import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import CartButton from "./CartButton";

const Header = function (props) {
  return (
    <>
      <header className={styles.header}>
        <h1>Meals</h1>
        <CartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="A table full of delicios food!" />
      </div>
    </>
  );
};

export default Header;
