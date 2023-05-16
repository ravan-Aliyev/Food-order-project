import { useRef } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = function (props) {
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = +amountInputRef.current.value;

    if (enteredAmount < 1 || enteredAmount > 5) {
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  const input = {
    type: "number",
    id: "amount_" + props.id,
    min: 0,
    max: 5,
    defaultValue: 1,
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input ref={amountInputRef} label="Amount" input={input} />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
