import { Fragment, useState } from "react";
import { Fade, Zoom } from "react-reveal";
import classes from "./Cart.module.css";
import Modal from "./Modal";

const Cart = (props) => {
  const cartItemsDetails = props.cartItems.map((item) => (
    <Fade top>
      <div className={classes.item} key={item.id}>
        <img src={item.image} alt=""></img>
        <div className={classes.info}>
          <p>{item.title}</p>
          <p>
            $ {item.price} x {item.count}
          </p>
          <button
            onClick={() => {
              props.onRemoveFromCart(item);
              props.onDecr();
            }}
          >
            −
          </button>
          <button
            onClick={() => {
              props.onAddToCart(item);
              props.onIncr();
            }}
          >
            +
          </button>
        </div>
      </div>
    </Fade>
  ));

  let totalPrice = 0;
  if (props.cartItems.length > 0) {
    totalPrice = props.cartItems.map((item) => item.price * item.count);
    totalPrice = totalPrice.reduce((accum, current) => accum + current);
    console.log(totalPrice);
  }

  const [isProceed, setIsProceed] = useState(false);
  function proceedHandler() {
    setIsProceed(true);
    console.log(props.cartItems);
  }
  function closeProceed() {
    setIsProceed(false);
    props.onClick();
    props.onProceed();
  }

  return (
    <Fragment>
      {!isProceed && (
        <Fragment>
          <Modal onClick={props.onClick}></Modal>
          <div className={classes.cart}>
            {props.cartItems.length === 0 && (
              <p style={{ margin: "auto" }}>Your cart is empty</p>
            )}
            {props.cartItems.length > 0 && cartItemsDetails}
          </div>
          <div className={classes.lower}>
            <p className={classes.total}>Total: ${totalPrice.toFixed(2)}</p>
            <div className={classes.buttons}>
              <button onClick={props.onClick}>Close</button>
              <button onClick={proceedHandler}>Proceed</button>
            </div>
          </div>
        </Fragment>
      )}
      {isProceed && props.cartItems.length > 0 && (
        <Fragment>
          <Modal onClick={closeProceed}> </Modal>
          <div className={classes.proceed} onClick={closeProceed}>
            <Zoom>
              <h4>Your Request has been sent!</h4>
              <button>continue</button>
            </Zoom>
          </div>
        </Fragment>
      )}
      {isProceed && props.cartItems.length === 0 && (
        <Fragment>
          <Modal onClick={closeProceed}> </Modal>
          <div
            className={classes.proceed}
            onClick={closeProceed}
            style={{ backgroundColor: "#fd5f5f" }}
          >
            <Zoom>
              <h4>Your Cart is empty!</h4>
              <button>continue</button>
            </Zoom>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
