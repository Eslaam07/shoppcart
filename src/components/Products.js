import classes from "./Products.module.css";
import { Roll } from "react-reveal";

const Products = (props) => {
  const products = props.products.map((item) => (
    <div className={classes.item} key={item.id}>
      <img src={item.image} alt=""></img>
      <h4 className={classes.description}>{item.title}</h4>
      <div className={classes.lower}>
        <p className={classes.price}>$ {item.price}</p>
        <button
          onClick={() => {
            props.onAddToCart(item);
            props.onIncr();
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <Roll left cascade>
      <div className={classes.container}>{products}</div>
    </Roll>
  );
};

export default Products;
