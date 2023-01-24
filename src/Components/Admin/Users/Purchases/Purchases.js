import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPurchases,
  filterByStatus,
  getPurchasesByEmail,
  filterByMail,
  updatePurchase,
} from "../../../..//Redux/Actions/";
import { v4 as randomId } from "uuid";

import { Link } from "react-router-dom";

import { useAuth } from "../../../Context/authContext";

import "./Purchases.css";
import Paging from "../../Paging/Paging";

function Purchases() {
  const dispatch = useDispatch();
  const { authUser } = useAuth();
  const purchases = useSelector((state) => state.purchases);
  const [currentPage, setCurrentPage] = useState(1);
  const [purchasesPerPage, setPurchasesPerPage] = useState(10);
  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const purchaseStatus = ["created", "completed", "pending", "rejected"];
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllPurchases(authUser.email));
    dispatch(getPurchasesByEmail(authUser.email));
  }, []);

  const currentPurchases = purchases?.slice(
    indexOfFirstPurchase,
    indexOfLastPurchase
  );
  const [mailSearch, setMailSearch] = useState("");

  function paging(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleFilterByStatus(e) {
    setCurrentPage(1);
    dispatch(filterByStatus(e.target.value));
  }

  function handlePagesChange(e) {
    setPurchasesPerPage(e.target.value);
  }

  function handleInputChange(e) {
    e.preventDefault();
    setMailSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(filterByMail(mailSearch));
    setCurrentPage(1);
    document.getElementById("mailSearch").value = "";
  }

  function handleStatusChange(s) {
    setStatus(s.target.value);
  }

  function handleSubmit(id, _status) {
    dispatch(updatePurchase(id, status));
  }

  return (
    <div className="edit-product-main-container">
      <div className="edit-product-sub-container">
        <h1>Purchases</h1>
        <div className="search-by-email-container">
          <input
            type="text"
            id="mailSearch"
            placeholder="Search by email"
            className="admin-input"
            onChange={(e) => handleInputChange(e)}
          />
          <button
            className={"admin-search-buttons"}
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
          <button
            className={"admin-search-buttons"}
            onClick={() => dispatch(filterByMail(""))}
          >
            Reset
          </button>
        </div>
        <div className="admin-paging">
          <label htmlFor="purchaseStatus" className="admin-form-titles">
            Filter By Status
          </label>
          <select
            className="admin-input"
            name="purchaseStatus"
            onChange={(e) => handleFilterByStatus(e)}
          >
            {purchaseStatus.map((status) => {
              return <option value={status}>{status}</option>;
            })}
          </select>

          <label htmlFor="purchasesPerPage" className="admin-form-titles">
            Purchases Per Page
          </label>
          <select
            onChange={(e) => handlePagesChange(e)}
            className="admin-input"
            style={{ width: "5rem" }}
          >
            <option key={10}>10</option>
            <option key={20}>20</option>
            <option key={30}>30</option>
            <option key={40}>40</option>
            <option key={50}>50</option>
          </select>
        </div>
        <Paging
          itemsPerPage={purchasesPerPage}
          allItems={purchases?.length}
          paging={paging}
        />
        <div>
          <div className="admin-products-container">
            {currentPurchases !== undefined && currentPurchases.length > 0 ? (
              currentPurchases.map((purchase) => {
                return (
                  <div
                    key={randomId()}
                    className="admin-purchases-sub-container"
                  >
                    <div key={randomId()} className={"admin-purchases-card"}>
                      <div key={randomId()}>
                        <div key={randomId()}>
                          <p>User : {purchase.User.email}</p>
                          <hr />
                          <p>Purchase ID : {purchase.purchase_id}</p>
                        </div>
                        <hr />
                        <h3>Products :</h3>
                        {purchase.ProductDetails.map((product) => {
                          return (
                            <div
                              key={randomId()}
                              className={"admin-purchases-detail"}
                            >
                              <p>
                                {product.Product.name} :{" "}
                                {product.product_quantity}
                              </p>
                            </div>
                          );
                        })}
                        <hr />
                        {purchase.ScheduleDetails.map((schedule) => {
                          return (
                            <div
                              key={randomId()}
                              className={"admin-purchases-detail"}
                            >
                              <p>Schedule Details</p>
                              <p>Day : {schedule.Schedule.day}</p>
                              <p>
                                Quantity of seats :{" "}
                                {schedule.seat_numbers.length}
                              </p>
                            </div>
                          );
                        })}
                        <hr />
                        <p>Actual Status : {purchase.status}</p>
                        <>
                          Select New Status :
                          <select
                            name="status"
                            id="status"
                            className="admin-input"
                            onChange={(e) => handleStatusChange(e)}
                          >
                            {purchaseStatus.map((status) => {
                              return <option value={status}>{status}</option>;
                            })}
                          </select>
                        </>
                        <hr />
                      </div>
                      <div key={randomId()}>
                        <p>Total : ${purchase.amount}</p>
                      </div>
                      <button
                        className="delete-product-button"
                        onClick={() => handleSubmit(purchase.purchase_id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div key={randomId()}>
                <h3>No purchases</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link to="/adminmenu">
        <button className="admin-buttons">Back</button>
      </Link>
    </div>
  );
}

export default Purchases;
