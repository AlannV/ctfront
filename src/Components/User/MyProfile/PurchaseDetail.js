import React from "react";

import { Link } from "react-router-dom";

// ICONS
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function PurchaseDetail({ movieDetail, purchaseDetail }) {
  return (
    <div className="purchase--detail--container">
      <div className="purchase--detail">
        <h3>{movieDetail.title.toUpperCase()}</h3>
        <ul className="movie--detail--genre--list">
          {movieDetail.genre.map((g, i) => (
            <li className="movie--detail--list--item" key={i}>
              {g}
            </li>
          ))}
        </ul>
        <div className="movie--detail--button--container movie--detail--button__gomovie">
          <Link
            className="movie--detail--button"
            to={`/movie/${purchaseDetail.ScheduleDetails[0].Schedule.movie_id}`}
          >
            VIEW MOVIE DETAIL
            <KeyboardDoubleArrowRightIcon fontSize="large" />
          </Link>
        </div>
      </div>
      <div className="purchase--detail">
        <h3 className="purchase--data--title">SEATS</h3>
        <ul className="purchase--schedule--list">
          {purchaseDetail.ScheduleDetails[0].seat_numbers.map((seat, index) => (
            <li className="purchase--schedule--item" key={index}>
              {seat}
            </li>
          ))}
        </ul>
      </div>
      <div className="purchase--detail">
        <h3 className="purchase--data--title">SCHEDULE</h3>
        <p>{purchaseDetail.ScheduleDetails[0].Schedule.day}</p>
        <p>
          {purchaseDetail.ScheduleDetails[0].Schedule.time.substring(0, 5)} HS
        </p>
        <p>
          ROOM{" "}
          {purchaseDetail.ScheduleDetails[0].Schedule.Room.name.split(" ")[1]}
        </p>
      </div>
      <p className="purchase--time--container">
        BOUGHT AT {purchaseDetail.createdAt.split("T")[0]} -{" "}
        {purchaseDetail.createdAt.split("T")[1].substring(0, 5)}
      </p>
    </div>
  );
}
