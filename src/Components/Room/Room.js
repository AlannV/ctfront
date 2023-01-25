import React from "react";
import "./Room.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleById, delSchedule } from "../../Redux/Actions/schedules";
import { Link, useParams } from "react-router-dom";

// ICONS
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function Room() {
  const roomxd = useSelector((state) => state.scheduleById);
  //const sold = Object.keys(roomxd.Room.room_seats).filter(but=>roomxd.Room.room_seats[but]===false)
  const sold = roomxd.boughtSeats;
  // const corridor = ["A04","A16"]
  const { id } = useParams();

  const dispatch = useDispatch();

  const getGlobalData = () => {
    dispatch(getScheduleById(id));
  };
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    return () => {
      dispatch(delSchedule());
    };
  }, [dispatch]);

  // const date =roomxd.day.split("-")[2]+"-"+roomxd.day.split("-")[1]
  // const hour =roomxd.time.slice(0,5)

  function handleClick(e) {
    e.preventDefault();
    if (selected.includes(e.target.outerText)) {
      setSelected(selected.filter((seats) => seats !== e.target.outerText));
      if (e.target.className === "seat select corridor") {
        e.target.className = "seat corridor";
      } else {
        e.target.className = "seat";
      }
    } else if (e.target.className === "seat") {
      setSelected([...selected, e.target.outerText]);
      e.target.className = "seat select";
    } else if (e.target.className === "seat corridor") {
      setSelected([...selected, e.target.outerText]);
      e.target.className = "seat select corridor";
    } else if (e.target.className === "selec") {
      setSelected([...selected, e.target.outerText]);
      e.target.className = "seat";
    } else if (e.target.className === "selec corridor") {
      setSelected([selected.filter((s) => s !== e.target.outerText)]);
      e.target.className = "seat corridor";
    }
  }
  function checkOut() {
    let movieCart = {
      schedule_id: roomxd.schedule_id,
      day: roomxd.day,
      time: roomxd.time,
      movie: roomxd.Movie.title,
      selected: selected,
    };
    localStorage.setItem("movieCart", JSON.stringify(movieCart));
  }

  useEffect(() => {
    getGlobalData();
  }, []);

  const checkRender = () => {
    if (Object.keys(roomxd).length > 0) {
      const seats = roomxd.Room.room_seats;
      return (
        <div className="room--container">
          <div className="room--options--container">
            <img
              className="room--poster"
              src={roomxd.Movie.poster}
              alt="Loading..."
            />
            <div className="room--buttons--container" onClick={checkOut()}>
              <Link
                className="room--button"
                to={`/movie/buy/${roomxd.Movie.movie_id}`}
              >
                <ArrowCircleLeftIcon fontSize="large" />
                GO BACK
              </Link>
              <Link className="room--button" to={"/cart/"} onClick={checkOut()}>
                NEXT
                <ArrowCircleRightIcon fontSize="large" />
              </Link>
            </div>
          </div>
          <div className="room-seats--container">
            <div className="screen--container">
              <h2 className="screen--title">SELECT YOUR SEATS</h2>
              <ul className="screen--info--container">
                <li className="screen--info--item">
                  {roomxd.day.split("-")[2] + "-" + roomxd.day.split("-")[1]}
                </li>
                <li className="screen--info--item">
                  {roomxd.time.split(":")[0] + ":" + roomxd.time.split(":")[1]}
                  hs
                </li>
                <li className="screen--info--item">
                  {roomxd.Movie.title.toUpperCase()}
                </li>
                <li className="screen--info--item">
                  {roomxd.Movie.duration}min
                </li>
                <li className="screen--info--item">
                  {roomxd.Room.name.toUpperCase()}
                </li>
                <li className="screen--info--item">
                  ${roomxd.price.toFixed(2)}each - Total $
                  {roomxd.price * selected.length.toFixed(2)}
                </li>
              </ul>
            </div>
            <div className="seats--container">
              {seats.map((s) => {
                return (
                  <div
                    className={
                      sold.includes(s)
                        ? "sold"
                            .concat(s.includes("04") ? " corridor" : "")
                            .concat(s.includes("16") ? " corridor" : "")
                        : "seat"
                            .concat(s.includes("04") ? " corridor" : "")
                            .concat(s.includes("16") ? " corridor" : "")
                    }
                    key={s}
                    onClick={(e) => handleClick(e)}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
            <div className="instructions--seats--container">
              <div className="normal--seat--container">
                <p>AVAILABLE</p>
                <div className="normal--seat"></div>
              </div>
              <div className="your--seat--container">
                <p>SELECTED</p>
                <div className="your--seat"></div>
              </div>
              <div className="your--seat--container">
                <p>NOT AVAILABLE</p>
                <div className="noavailable--seat"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>no esta en true la variable monstro</p>;
    }
  };

  return <div>{checkRender()}</div>;
}

//  {
//   schedule_id: 9,
//   day: '2022-07-09',
//   time: '16:10:00',
//   active: true,
//   createdAt: '2022-09-05T01:33:15.724Z',
//   Movie: {
//     movie_id: 4,
//     title: 'The Jack in the Box: Awakening',
//     poster: 'https://m.media-amazon.com/images/M/MV5BNzA0YzhmZD…OWQyMzI1OTA2XkEyXkFqcGdeQXVyNzU4NzMwMjI@._V1_.jpg',
//     display: Array(1),
//     duration: 93}
//  Room: {
//     room_id: 2,
//     name: 'Sala 2',
//     display_type: '3D'
//
//   }
// active: true
// createdAt: "2022-09-05T01:33:15.724Z"
// day: "2022-07-09"
// movie_id: 4
// room_id: 2
// schedule_id: 9
// time: "16:10:00"
// updatedAt: "2022-09-05T01:33:15.724Z"
