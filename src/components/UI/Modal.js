import { useContext } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import CartProvider from "../../store/cart-context";

const Backdrop = function (props) {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = function (props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = function (props) {
  const ctx = useContext(CartProvider);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
