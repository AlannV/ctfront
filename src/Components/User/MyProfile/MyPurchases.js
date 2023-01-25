import "./MyPurchases.css";

import React, { useEffect, useState } from "react";
import PurchaseDetail from "./PurchaseDetail.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/Context/authContext";
import { connect } from "react-redux";
import { getAllMovies } from "../../../Redux/Actions/movies";
import { getPurchasesByEmail } from "../../../Redux/Actions/";
import { getAllUsers } from "../../../Redux/Actions/user";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function MyPurchases({
  getAllMovies,
  allMovies,
  getPurchasesByEmail,
  historyByEmail,
  getAllUsers,
  users,
}) {
  const { authUser } = useAuth();

  // HANDLE PARA VER TODAS LAS COMPRAS O SOLO LAS COMPRAS PROPIAS SI EL USUARIO ES UN ADMINISTRADOR
  const [historyFiltered, setHistoryFiltered] = useState([]);
  historyFiltered && console.log(historyFiltered);
  historyByEmail && console.log(historyByEmail);

  function handleFilterHistory(e) {
    if (e.target.innerHTML.includes("MINE")) {
      e.currentTarget.parentElement.firstChild.className =
        "filter--purchases--button";
      e.currentTarget.className =
        "filter--purchases--button filter--purchases--button__selected";
      historyByEmail = historyByEmail.filter((h) => h.user_id === authUser.uid);
      setHistoryFiltered(historyByEmail);
    } else {
      e.currentTarget.parentElement.lastChild.className =
        "filter--purchases--button";
      e.currentTarget.className =
        "filter--purchases--button filter--purchases--button__selected";
      setHistoryFiltered(historyByEmail);
    }
  }

  // MANEJANDO EL ESTADO LOCAL SHOWDETAIL PARA MOSTRAR LOS DETALLES DE CADA COMPRA
  const [showDetail, setShowDetail] = useState([]);

  function handleViewDetail(purchase_id) {
    if (showDetail.length === 0) {
      setShowDetail([...showDetail, purchase_id]);
    } else if (showDetail.includes(purchase_id)) {
      setShowDetail(showDetail.filter((id) => id !== purchase_id));
    } else {
      setShowDetail([...showDetail, purchase_id]);
    }
  }

  useEffect(() => {
    getAllMovies();
    getAllUsers();
    authUser && getPurchasesByEmail(authUser.email);
  }, [authUser, getPurchasesByEmail, getAllMovies, getAllUsers]);

  useEffect(() => {
    historyByEmail && setHistoryFiltered(historyByEmail);
  }, [historyByEmail]);

  return (
    <div className="purchases--container">
      {historyByEmail.length > 0 && allMovies.length > 0 ? (
        <>
          <h2 className="purchase--title">MY PURCHASES</h2>
          {users?.filter((u) => u.email === authUser?.email)[0].role_id ===
            "A" && (
            <div className="filter--purchases--container">
              <button
                className="filter--purchases--button filter--purchases--button__selected"
                onClick={(e) => handleFilterHistory(e)}
              >
                VIEW ALL
              </button>
              <button
                className="filter--purchases--button"
                onClick={(e) => handleFilterHistory(e)}
              >
                VIEW MINE
              </button>
            </div>
          )}
          {historyFiltered?.map((p) => (
            <div key={p.purchase_id}>
              <div className="purchase--container">
                <img
                  className="purchase--poster"
                  src={
                    allMovies.filter(
                      (m) =>
                        m.movie_id === p.ScheduleDetails[0].Schedule.movie_id
                    )[0].poster
                  }
                  alt={
                    allMovies.filter(
                      (m) =>
                        m.movie_id === p.ScheduleDetails[0].Schedule.movie_id
                    )[0].title
                  }
                />
                <div className="purchase--data--container">
                  <h3 className="purchase--data--title">PRODUCTS</h3>
                  <ul className="purchase--products--list">
                    {p.ProductDetails.map((product, index) => (
                      <li className="purchase--products--item" key={index}>
                        {product.Product.name} - {product.product_quantity} - $
                        {product.price}
                      </li>
                    ))}
                    {p.ScheduleDetails[0].seat_numbers.length > 0 && (
                      <li>
                        Tickets - {p.ScheduleDetails[0].seat_numbers.length} - $
                        {p.ScheduleDetails[0].seat_numbers.length * 5}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="purchase--data--container">
                  <h3 className="purchase--data--title">TOTAL</h3>
                  <p>
                    ${p.amount + p.ScheduleDetails[0].seat_numbers.length * 5}
                  </p>
                </div>
                <div className="movie--detail--button--container movie--detail--button__viewdetail">
                  <button
                    className="movie--detail--button"
                    onClick={() => handleViewDetail(p.purchase_id)}
                  >
                    <p>VIEW DETAIL</p>
                    {showDetail.includes(p.purchase_id) ? (
                      <ExpandLessIcon fontSize="large" />
                    ) : (
                      <ExpandMoreIcon fontSize="large" />
                    )}
                  </button>
                </div>
              </div>
              {showDetail.includes(p.purchase_id) && (
                <PurchaseDetail
                  movieDetail={
                    allMovies.filter(
                      (m) =>
                        m.movie_id === p.ScheduleDetails[0].Schedule.movie_id
                    )[0]
                  }
                  purchaseDetail={p}
                />
              )}
            </div>
          ))}
        </>
      ) : (
        <p className="purchases--notfound">NO PURCHASES SO FAR</p>
      )}
      <div className="movie--detail--button--container movie--detail--button__goback">
        <Link className="movie--detail--button" to={"/myprofile"}>
          <ArrowCircleLeftIcon fontSize="large" />
          GO BACK
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allMovies: state.allMovies,
    historyByEmail: state.historyByEmail,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  getAllMovies,
  getPurchasesByEmail,
  getAllUsers,
})(MyPurchases);
