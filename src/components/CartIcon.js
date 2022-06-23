import React, { useState, useEffect } from "react";
import classes from "./CartIcon.module.css";

const CartIcon = (props) => {
  const [bumpState, setBumpState] = useState(false);
  const countClasses = `${bumpState ? classes.bump : ""}`;

  useEffect(() => {
    if (props.badgeCounter === 0) {
      return;
    }

    setBumpState(true);

    const timer = setTimeout(() => {
      setBumpState(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [props.badgeCounter]);

  return (
    <li
      style={{ position: "relative", listStyle: "none" }}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="white"
        className="bi bi-cart"
        viewBox="0 0 16 16"
        cursor="pointer"
      >
        {" "}
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
      </svg>
      <p
        className={countClasses}
        style={{
          position: "absolute",
          top: "-12px",
          right: "-10px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "red",
        }}
      >
        {props.badgeCounter}
      </p>
    </li>
  );
};

export default CartIcon;
