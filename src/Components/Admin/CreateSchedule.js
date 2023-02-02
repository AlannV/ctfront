import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/AdminSchedules.css";
import allActions from "../../Redux/Actions";
const { getRooms, getAllMovies, createSchedule } = allActions;

function CreateSchedule({ setIsOpenCreateSchedule }) {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.rooms);
  const movies = useSelector((state) => state.allMovies);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getAllMovies());
  }, [dispatch]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduleData, setScheduleData] = useState({
    room_id: 0,
    movie_id: 0,
    day: "",
    time: "",
    active: true,
  });

  function handleDateChange(e) {
    setDate(e.target.value);
    setScheduleData({
      ...scheduleData,
      day: e.target.value,
    });
  }

  function handleTimeChange(e) {
    setTime(e.target.value);
    setScheduleData({
      ...scheduleData,
      time: e.target.value,
    });
  }

  function handleSelectRoom(e) {
    e.preventDefault();
    setScheduleData({
      ...scheduleData,
      room_id: e.target.value,
    });
  }

  function handleSelectMovie(e) {
    e.preventDefault();
    setScheduleData({
      ...scheduleData,
      movie_id: e.target.value,
    });
  }

  function handleReset() {
    setDate("");
    setTime("");
    setScheduleData({
      room_id: 0,
      movie_id: 0,
      day: "",
      time: "",
      active: true,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createSchedule(scheduleData));
    handleReset();
  }

  return (
    <div className="create-schedule-main-container">
      <h1>Create Schedule</h1>
      <div className="create-schedule-sub-container">
        <div className="create-schedule">
          <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
            <>
              <label htmlFor="date" className="admin-form-titles">
                Date :
              </label>
              <input
                className="admin-input"
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={(e) => handleDateChange(e)}
              />
            </>
            <>
              <label htmlFor="time" className="admin-form-titles">
                Time :
              </label>
              <input
                className="admin-input"
                key="time"
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={(e) => handleTimeChange(e)}
              />
            </>

            <>
              <label htmlFor="room" className="admin-form-titles">
                Room :
              </label>
              <select
                className="admin-input"
                onChange={(e) => handleSelectRoom(e)}
                name="room"
                id="room"
              >
                <option value="0">Select Room</option>
                {rooms ? (
                  rooms.map((room) => {
                    return (
                      <option key={room.room_id} value={room.room_id}>
                        {room.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="1">Loading...</option>
                )}
              </select>
            </>

            <>
              <label htmlFor="movie" className="admin-form-titles">
                Movie :
              </label>
              <select
                className="admin-input"
                onChange={(e) => handleSelectMovie(e)}
                name="movie"
                id="movie"
              >
                <option value="0">Select Movie</option>
                {movies ? (
                  movies.map((movie) => {
                    return (
                      <option key={movie.movie_id} value={movie.movie_id}>
                        {movie.title}
                      </option>
                    );
                  })
                ) : (
                  <option value="1">Loading...</option>
                )}
              </select>
            </>
            <div className="admin-buttons-container">
              <div className="another-container">
                <button type="submit" className="admin-buttons">
                  Create Schedule
                </button>
                <button
                  type="reset"
                  className="admin-buttons"
                  onClick={() => handleReset()}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button
        className="admin-buttons"
        onClick={() => setIsOpenCreateSchedule(false)}
      >
        Close
      </button>
    </div>
  );
}

export default CreateSchedule;
