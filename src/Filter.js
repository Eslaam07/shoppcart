import classes from "./Filter.module.css";

const Filter = (props) => {
  function filterChangeHandler(event) {
    props.onFilter(event.target.value);
  }

  return (
    <div className={classes.filter}>
      <div className={classes["filter-result"]}>
        <p>{props.products.length} Products</p>
      </div>
      <div className={classes["filter-sort"]}>
        <label htmlFor="sort">Sort: </label>
        <select id="sort" onChange={filterChangeHandler}>
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className={classes["filter-sizes"]}>
        <label htmlFor="size">Size: </label>
        <select id="size" onChange={filterChangeHandler}>
          <option value="all">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
