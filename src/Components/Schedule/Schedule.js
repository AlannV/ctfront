import React from "react";
import "./Schedule.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchedule } from "./../../Redux/Actions/schedules";
import { Link } from "react-router-dom";
import ScheduleCardGral from "./ScheduleCardGral";

// ICONS
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Schedule() {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(getAllSchedule());
  }, [dispatch]);
  let now1 = new Date();
  const nowd =
    now1.getFullYear() + "-0" + now1.getMonth() + "-" + now1.getDate();
  const nowt =
    now1.getHours() + ":" + now1.getMinutes() + ":" + now1.getSeconds();

  return (
    <div className="schedule--container">
      {schedule.length === 0 ? (
        <div className="landing">Loading...</div>
      ) : (
        <>
          <div className="schedule--cards--container">
            {schedule.map((m) => {
              if (
                m.day.split("-")[0] <= nowd.split("-")[0] &&
                m.day.split("-")[1] <= nowd.split("-")[1] &&
                m.day.split("-")[2] < nowd.split("-")[2]
              )
                return "";
              else if (
                m.day.split("-")[2] === nowd.split("-")[2] &&
                parseInt(m.time.split(":")[0]) <= parseInt(nowt.split(":")[0])
              )
                return "";
              else if (
                parseInt(m.time.split(":")[0]) <=
                  parseInt(nowt.split(":")[0]) &&
                parseInt(m.time.split(":")[1]) < parseInt(nowt.split(":")[1])
              )
                return "";
              else
                return (
                  <Link
                    className="schedule--card--container"
                    key={m.schedule_id}
                    to={
                      m.Room.room_seats.length > m.boughtSeats.length
                        ? "/schedule/" + m.schedule_id
                        : ""
                    }
                  >
                    {" "}
                    {/* SOLD OUT */}
                    <ScheduleCardGral
                      day={m.day}
                      name={m.Movie.title}
                      time={m.time}
                      room={m.Room.name}
                      display={m.Room.display_type}
                    />
                    <KeyboardDoubleArrowRightIcon fontSize="large" />
                    {m.Room.room_seats.length <= m.boughtSeats.length && (
                      <p className="sold--out">SOLD OUT</p>
                    )}
                  </Link>
                );
            })}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="movie--detail--button--container movie--detail--button__goback schedule--button--goback">
            <Link className="movie--detail--button" to={`/`}>
              <ArrowCircleLeftIcon fontSize="large" />
              GO BACK
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
