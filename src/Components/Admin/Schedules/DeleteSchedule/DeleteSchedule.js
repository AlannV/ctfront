import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../../../Redux/Actions/rooms";
import { getAllMovies } from "../../../../Redux/Actions/movies";
import {
  getSchedules,
  activateSchedule,
  deleteSchedule,
} from "../../../../Redux/Actions/schedules";
import Loading from "../../../Common/Loading/Loading";
import Paging from "../../Paging/Paging";

import "./DeleteSchedule.css";

function DeleteSchedule() {
  const dispatch = useDispatch();

  const allSchedules = useSelector((state) => state.allSchedules);
  const allRooms = useSelector((state) => state.rooms);
  const allMovies = useSelector((state) => state.allMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [schedulesPerPage] = useState(10);
  const indexOfLastSchedule = currentPage * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
  const currentSchedules = allSchedules?.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  useEffect(() => {
    dispatch(getSchedules());
    dispatch(getRooms());
    dispatch(getAllMovies());
  }, [dispatch]);

  function paging(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleDelete(el) {
    const payload = {
      schedule_id: el,
    };
    dispatch(deleteSchedule(payload));
    setTimeout(() => {
      dispatch(getSchedules());
    }, 1000);
  }

  function handleActivate(el) {
    const payload = {
      schedule_id: el,
    };
    dispatch(activateSchedule(payload));
    setTimeout(() => {
      dispatch(getSchedules());
    }, 1000);
  }

  return (
    <div className="delete-schedule-main-container">
      <h1>Delete Schedule</h1>
      <Paging
        itemsPerPage={schedulesPerPage}
        allItems={allSchedules?.length}
        paging={paging}
      />
      <div className="delete-schedule-sub-container">
        {currentSchedules && allRooms && allMovies ? (
          currentSchedules.map((el, index) => (
            <div key={index} className="admin-schedule">
              Movie:{" "}
              <h3 className="delete-schedule-titles">
                {allMovies.map((movie) =>
                  movie.movie_id === el.movie_id ? movie.title : null
                )}
              </h3>
              Room:{" "}
              <h3>
                {allRooms.map((room) =>
                  room.room_id === el.room_id ? room.name : null
                )}
              </h3>
              Date:
              <h3>{el.day}</h3>
              Time:
              <h3>{el.time}</h3>
              Status:
              <h3 className={el.active === true ? "active" : "inactive"}>
                {el.active === true ? "Active" : "Inactive"}
              </h3>
              <button
                className="admin-buttons"
                onClick={() => handleDelete(el.schedule_id)}
              >
                Delete Schedule
              </button>
              <button
                className="admin-buttons"
                onClick={() => handleActivate(el.schedule_id)}
              >
                Activate Schedule
              </button>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Link to="/adminmenu" className="admin-buttons">
        <div>Go Back</div>
      </Link>
    </div>
  );
}

export default DeleteSchedule;
