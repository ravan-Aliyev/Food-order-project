import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim().length === 0;
const isNotValid = (value) => value.trim().length !== 5;

const Checkout = function (props) {
  const [formInputValidity, setFormInputValidty] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isNotValid(enteredPostal);

    setFormInputValidty({
      name: enteredNameIsValid,
      street: enteredCityIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div
        className={`${styles.control} ${
          formInputValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidity.name && (
          <p className={styles["error-text"]}>Please enter valid name!</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && (
          <p className={styles["error-text"]}>Please enter valid street!</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.postal ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!formInputValidity.postal && (
          <p className={styles["error-text"]}>
            Please enter valid postal code!
          </p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValidity.city && (
          <p className={styles["error-text"]}>Please enter valid city!</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
