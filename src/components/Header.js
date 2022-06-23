import React from "react";
import "./Header.module.css";
import CartIcon from "./CartIcon";

const Header = (props) => {
  return (
    <header>
      <a href="/">Shopping Cart</a>
      <nav>
        <CartIcon
          onClick={props.onClick}
          badgeCounter={props.badgeCounter}
        ></CartIcon>
      </nav>
    </header>
  );
};

export default Header;
