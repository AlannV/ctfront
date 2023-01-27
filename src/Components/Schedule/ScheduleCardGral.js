import React from "react";
import "../../Styles/Schedule.css";

export default function ScheduleCardGral({ day, time, room, display, name }) {
  const date = day.split("-")[2] + "-" + day.split("-")[1];

  return (
    <div className="schedule--data--container">
      <p className="schedule--data">{date}</p>
      <p className="schedule--data">{time.toString().slice(0, 5)}</p>
      <p className="schedule--data">{name}</p>
      <p className="schedule--data">{room.toUpperCase()}</p>
      <p className="schedule--data">{display}</p>
    </div>
  );
}
