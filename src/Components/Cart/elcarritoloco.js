import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions";
import { v4 as randomId } from "uuid";
import { useAuth } from "../Context/authContext";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckoutConfirm from "../CheckoutConfirm/checkoutConfirm.js";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import Nothing from "../Loading/Nothing";
import Loading from "../Loading/Loading";
import LoginCart from "../LoginCart/LoginCart";

import "./Cart.css";
import "../CheckoutConfirm/checkoutConfirm.css";
import { Login, PhotoSizeSelectLargeOutlined } from "@mui/icons-material";

function Cart() {
  const dispatch = useDispatch();

  //Estado que muestra y esconde el checkout
  const [toggleCheckout, setToggleCheckout] = useState(false);

  const [movieLocalStorage, setMovieLocalStorage] = useState({});
  const [amount, setAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [localStorage, setLocalStorage] = useState({});
  const [loginS, setLoginS] = useState("hide");

  const { authUser } = useAuth();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const local = window.localStorage.getItem("movieCart");
    setMovieLocalStorage(JSON.parse(local));
    dispatch(getProducts());
    const local2 = window.localStorage.getItem("productsCart");
    const local3 = window.localStorage.getItem("amount");
    setLocalStorage(local2 ? JSON.parse(local2) : {});
    setAmount(JSON.parse(local3));
  }, [dispatch]);

  function handleReset() {
    window.localStorage.setItem("productsCart", JSON.stringify({}));
    setLocalStorage({});
    setAmount(0);
    window.localStorage.setItem("amount", JSON.stringify(0));
  }

  function reqLogin() {
    setLoginS("show");
  }

  function handleAddToCart(id, name, price) {
    if (!toggle) {
      if (localStorage) {
        if (localStorage[id]) {
          localStorage[id][1].quantity += 1;
          setLocalStorage({ ...localStorage });
          setAmount(amount + localStorage[id][2].price);
          window.localStorage.setItem("amount", JSON.stringify(amount));
          window.localStorage.setItem(
            "productsCart",
            JSON.stringify(localStorage)
          );
        } else {
          localStorage[id] = [
            { name: name },
            { quantity: 1 },
            { price: price },
            { id: id },
          ];
          setLocalStorage({ ...localStorage });
          setAmount(amount + localStorage[id][2].price);
          window.localStorage.setItem("amount", JSON.stringify(amount));
          window.localStorage.setItem(
            "productsCart",
            JSON.stringify(localStorage)
          );
        }
      } else {
        localStorage[id] = [
          { name: name },
          { quantity: 1 },
          { price: price },
          { id: id },
        ];
        setLocalStorage({ ...localStorage });
        setAmount(localStorage[id][2].price);
        window.localStorage.setItem("amount", JSON.stringify(amount));
        window.localStorage.setItem(
          "productsCart",
          JSON.stringify(localStorage)
        );
      }
    }
  }

  function handleRemoveFromCart(id) {
    if (!toggle) {
      if (localStorage[id][1].quantity > 1) {
        localStorage[id][1].quantity -= 1;
        setLocalStorage({ ...localStorage });
        setAmount(amount - localStorage[id][2].price);
        window.localStorage.setItem("amount", JSON.stringify(amount));
        window.localStorage.setItem(
          "productsCart",
          JSON.stringify(localStorage)
        );
      } else {
        setAmount(amount - localStorage[id][2].price);
        window.localStorage.setItem("amount", JSON.stringify(amount));
        delete localStorage[id];
        setLocalStorage({ ...localStorage });
        window.localStorage.setItem(
          "productsCart",
          JSON.stringify(localStorage)
        );
      }
    }
  }
  function translate() {
    var local2 = [];
    Object.keys(localStorage).forEach((key) => {
      let idTemp = localStorage[key][3]?.id;
      let nameTemp = localStorage[key][0]?.name;
      let quantityTemp = localStorage[key][1]?.quantity;
      let priceTemp = localStorage[key][2]?.price;
      local2.push({
        name: nameTemp,
        quantity: quantityTemp,
        price: priceTemp,
        id: idTemp,
      });
    });
    return local2;
  }

  const sendPayment = {
    token: authUser?.accessToken,
    scheduleId: movieLocalStorage,
    productsBuy: translate(),
  };

  async function startPaymentProcess() {
    setToggle(true);
    const paymentBasic = await axios.post(
      "http://localhost:3001/payment",
      sendPayment
    );
    const script = document.createElement("script");
    const attr_data_preference = document.createAttribute("data-preference-id");
    attr_data_preference.value = paymentBasic.data.id;
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);
    document.getElementById("pay").appendChild(script);
  }

  function testeando() {
    setToggleCheckout(true);
  }

  return !localStorage ? (
    <div>
      {" "}
      <Nothing />{" "}
    </div>
  ) : (
    <div className="cart-main-container">
      <div className="cart-sub-container">
        <h2 className="cart-title">Details of your order:</h2>
        <hr className="cart-hr" />
        {movieLocalStorage ? (
          <div key={randomId()} className="items-movies-in-cart-container">
            <div key={randomId()} className="movie-in-cart-container">
              <div key={randomId()} className="movie-in-cart-card">
                <h3>Movie : {movieLocalStorage.movie}</h3>
                <h3>
                  Day :{" "}
                  {movieLocalStorage.day
                    ? movieLocalStorage.day.split("-")[2] +
                      "-" +
                      movieLocalStorage.day.split("-")[1]
                    : ""}
                </h3>
                <h3>
                  Time :{" "}
                  {movieLocalStorage.time
                    ? movieLocalStorage.time.split(":")[0] +
                      ":" +
                      movieLocalStorage.time.split(":")[1]
                    : ""}
                </h3>
                <h3>
                  Quantity of Seats : {movieLocalStorage.selected?.length}
                </h3>
                <h3>
                  Seats Selected : {movieLocalStorage.selected?.join(", ")}
                </h3>
              </div>
            </div>
            <hr className="cart-hr" />
            <div key={randomId()} className="cart-text-prices-container">
              <h3 className="cart-text-prices">
                Movie tickets total price: $
                {movieLocalStorage.selected
                  ? (movieLocalStorage.selected.length * 5).toFixed(2)
                  : "0.00"}
              </h3>
            </div>
            <div key={randomId()} className="cart-products-in-cart-container">
              <div
                key={randomId()}
                className="cart-products-in-cart-sub-container"
              >
                <hr className="cart-hr" />
                {Object.keys(localStorage).map((product) => {
                  return (
                    <div className="cart-products-in-cart" key={randomId()}>
                      <div
                        key={randomId()}
                        className="cart-products-in-cart-name"
                      >
                        {localStorage[product][0].name}
                      </div>
                      <div
                        key={randomId()}
                        className="cart-quantity-buttons-container"
                      >
                        {!toggle ? (
                          <button
                            className="cart-quantity-buttons"
                            onClick={() => handleRemoveFromCart(product)}
                          >
                            -
                          </button>
                        ) : (
                          ""
                        )}
                        <div key={randomId()} className="product-quantity">
                          {localStorage[product][1].quantity}
                        </div>
                        {!toggle ? (
                          <button
                            className="cart-quantity-buttons"
                            onClick={() => handleAddToCart(product, product)}
                          >
                            +
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div key={randomId()} className="cart-product-price">
                        {"$" +
                          (
                            localStorage[product][1].quantity *
                            localStorage[product][2].price
                          ).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr className="cart-hr" />
            {amount ? (
              <div key={randomId()} className="cart-text-prices-container">
                <h3 className="cart-text-prices">
                  Food & Drinks total price: ${" "}
                  {amount ? amount.toFixed(2) : "0:00"}
                </h3>
              </div>
            ) : null}
            <hr className="cart-hr" />
            <div key={randomId()} className="cart-text-prices-container">
              <h3 className="cart-text-prices">
                Total: $
                {(
                  parseFloat(amount ? amount.toFixed(2) : 0) +
                  parseFloat(
                    movieLocalStorage.selected
                      ? (movieLocalStorage.selected.length * 5).toFixed(2)
                      : 0
                  )
                ).toFixed(2)}
              </h3>
            </div>
            <hr className="cart-hr" />
            <div className="cart-buttons-container">
              <button className="cart-buttons" onClick={() => handleReset()}>
                EMPTY CART <ReplayOutlinedIcon />
              </button>
              {/* <button className="cart-buttons" onClick={() => translate()}>
                I'M A BUTTON
              </button> */}
              {authUser?.uid ? (
                <div id="pay">
                  {!toggle ? (
                    <button
                      className="cart-buttons"
                      onClick={startPaymentProcess}
                    >
                      CONTINUE <ArrowCircleRightOutlinedIcon />
                    </button>
                  ) : (
                    <button
                      className="cart-buttons"
                      onClick={() => setToggle(false)}
                    >
                      EDIT
                    </button>
                  )}
                </div>
              ) : (
                <button className="cart-buttons" onClick={() => reqLogin()}>
                  LOGIN{" "}
                </button>
              )}
            </div>
            <hr className="cart-hr" />
            <div className="cart-products-main-container">
              {products ? (
                <div key={randomId()} className="cart-products-container">
                  {products?.map((product, index) => (
                    <div key={randomId()} className="cart-product-card">
                      <h2>{product.name}</h2>
                      <img
                        className="cart-product-image"
                        key={randomId()}
                        src={product.image}
                        alt="product"
                        onClick={() =>
                          handleAddToCart(
                            product.product_id,
                            product.name,
                            product.price
                          )
                        }
                      />
                      <div key={randomId()} className="admin-product-info">
                        <p>Price : ${product.price}</p>
                      </div>
                      <h3>
                        Add to cart <AddShoppingCartIcon />
                      </h3>
                    </div>
                  ))}
                  <hr className="cart-hr" />
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <hr className="cart-hr" />
        <br />
      </div>
      {authUser?.uid ? (
        ""
      ) : loginS === "show" ? (
        <LoginCart state="login-cart-active" />
      ) : (
        ""
      )}
      <div>
        <button onClick={testeando}>Apretame capo</button>
        {toggleCheckout ? (
          <CheckoutConfirm
            toggleCheckout={toggleCheckout}
            setToggleCheckout={setToggleCheckout}
            paymentData={sendPayment}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Cart;
