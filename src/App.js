import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./components/Products";
import "./App.css";
import { Fragment, useState } from "react";
import Cart from "./components/Cart";
import Filter from "./Filter";
import productsObj from "./data.json";

const products = productsObj.products;
console.log(products);

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  function toggleHandler() {
    setCartIsShown(!cartIsShown);
  }

  const localStorageItems = window.localStorage.getItem("cartItems");
  const initialItemsState = localStorageItems
    ? JSON.parse(localStorageItems)
    : [];

  const [cartItems, setCartItems] = useState(initialItemsState);

  function onAddToCart(addedItem) {
    const exist = cartItems.find((product) => product.id === addedItem.id);

    if (!exist) {
      setCartItems([...cartItems, { ...addedItem, count: 1 }]);
    }

    if (exist) {
      setCartItems(
        cartItems.map((product) =>
          product.id === addedItem.id
            ? {
                ...product,
                count: product.count + 1,
              }
            : product
        )
      );
    }
  }

  function onRemoveFromCart(removedItem) {
    if (removedItem.count === 1) {
      setCartItems(cartItems.filter((item) => item.id !== removedItem.id));
    }
    if (removedItem.count > 1) {
      setCartItems(
        cartItems.map((product) =>
          product.id === removedItem.id
            ? {
                ...product,
                count: product.count - 1,
              }
            : product
        )
      );
    }
  }

  const localStorageBadgeCounter = window.localStorage.getItem("badgeCounter");
  const initialBadgeCounterState = localStorageBadgeCounter
    ? JSON.parse(localStorageBadgeCounter)
    : 0;

  const [badgeCounter, setBadgeCounter] = useState(initialBadgeCounterState);

  function badgeCounterIncr() {
    setBadgeCounter(badgeCounter + 1);
  }
  function badgeCounterDecr() {
    setBadgeCounter(badgeCounter - 1);
  }

  const [filteredData, setFilteredData] = useState([...products]);

  function filterHandler(receivedFilter) {
    // Sort section

    if (receivedFilter === "latest") {
      setFilteredData([...filteredData.sort((a, b) => +a.id - +b.id)]);
    }
    if (receivedFilter === "lowest") {
      setFilteredData([...filteredData.sort((a, b) => a.price - b.price)]);
    }
    if (receivedFilter === "highest") {
      setFilteredData([...filteredData.sort((a, b) => b.price - a.price)]);
    }

    // Size section

    if (receivedFilter === "all") {
      setFilteredData([...products]);
    }

    if (
      receivedFilter !== "all" &&
      receivedFilter !== "latest" &&
      receivedFilter !== "lowest" &&
      receivedFilter !== "highest"
    ) {
      setFilteredData(
        products.filter((item) =>
          item.availableSizes.includes(receivedFilter.toUpperCase())
        )
      );
    }
  }

  function onProceed() {
    setCartItems([]);
    setBadgeCounter(0);
  }
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("badgeCounter", badgeCounter);

  return (
    <Fragment>
      {cartIsShown && (
        <Cart
          onClick={toggleHandler}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          onIncr={badgeCounterIncr}
          onDecr={badgeCounterDecr}
          onProceed={onProceed}
        ></Cart>
      )}
      <Header onClick={toggleHandler} badgeCounter={badgeCounter}></Header>
      <div className="container">
        <Filter onFilter={filterHandler} products={filteredData}></Filter>
        <Products
          products={filteredData}
          onAddToCart={onAddToCart}
          onIncr={badgeCounterIncr}
        ></Products>
      </div>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
