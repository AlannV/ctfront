import React, { useEffect, useState, usState } from "react";
import axios from "axios";

function CheckoutConfirm({ toggleCheckout, setToggleCheckout, paymentData }) {
  const [purchaseHappened, setPurchaseHappened] = useState(false);
  const [purchaseID, setPurchaseID] = useState(0);

  useEffect(() => {
    if (toggleCheckout) {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
  });

  async function revertPurchase() {
    await axios.put(
      "https://ctback-production.up.railway.app/payment/revertPurchase",
      {
        purchase_id: purchaseID,
      }
    );
  }

  async function closeCheckout(e) {
    if (e.target.id === "close") {
      if (purchaseHappened) {
        await revertPurchase();
      }
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
      setToggleCheckout(false);
    }
  }

  async function callMP() {
    const paymentBasic = await axios.post(
      "https://ctback-production.up.railway.app/payment",
      paymentData
    );
    setPurchaseID(paymentBasic.data.purchase_id);

    const script = document.createElement("script");
    const attr_data_preference = document.createAttribute("data-preference-id");
    attr_data_preference.value = paymentBasic.data.id;
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);
    document.getElementById("mercadopago").appendChild(script);
    setTimeout(() => {
      let clickEvent = new CustomEvent("click");
      let mpButton = document.querySelector(".mercadopago-button");
      mpButton.dispatchEvent(clickEvent);
      setPurchaseHappened(true);
    }, 2000);
  }

  async function makePayment() {
    if (!purchaseHappened) {
      //lo deja pagar solo cuando todavia no le dio click a Pagar, si ya le dio click, cerro la ventana de MP y quiere volver a tocar no lo va a dejar
      callMP();
    }
  }

  function showData() {
    if (paymentData && toggleCheckout) {
      //creo que al pedo checkear las 2 variables
      return (
        <>
          <ul key="tuvieja">
            {paymentData.productsBuy.map((product, index) => {
              return (
                <>
                  <li key={index}>{product.name + ": " + product.quantity}</li>
                </>
              );
            })}
            <li>
              {paymentData.scheduleId.movie +
                paymentData.scheduleId.selected.length}
            </li>
          </ul>
          <div>
            <>
              <button
                id="close"
                onClick={(e) => closeCheckout(e)}
                className="boton-grande"
              >
                Add more products
              </button>
              <button className="boton-grande" onClick={makePayment}>
                Pay
              </button>
              <button className="boton-grande" onClick={revertPurchase}>
                TEST ONLY - Reverse purchase
              </button>
            </>
          </div>
          <div id="mercadopago" className="escondido"></div>
        </>
      );
    }
  }

  return (
    <div id="myModal" className="modal" onClick={(e) => closeCheckout(e)}>
      <div className="modal-content">
        <span className="close">&times;</span>
        {/* <p>Some text in the Modal..</p> */}
        {showData()}
      </div>
    </div>
  );
}

export default CheckoutConfirm;
