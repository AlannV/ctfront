import "./Billboard.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMovies } from "./../../Redux/Actions/index";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";

function Billboard({ getMovies, movies, moviesFiltered }) {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries.map((e) => e.isIntersecting);
    if (entry[0]) {
      entries[0].target.className = "billboard--container";
    } else {
      entries[0].target.className =
        "billboard--container billboard--container__notrender";
    }
  });
  const handleMovieRef = (element) => {
    if (element != null) {
      observer.observe(element);
    }
  };

  function renderBillboard(m) {
    return (
      <Link
        key={m.movie_id}
        ref={handleMovieRef}
        className="billboard--container"
        to={`/movie/${m.movie_id}`}
      >
        <img className="billboard--poster" src={m.poster} alt={m.title} />
        <div className="billboard--info">
          <p className="billboard--description">
            {m.description.slice(0, 140).concat("...")}
          </p>
          {m.comingSoon && <p className="billboard--comingsoon">PREMIERE</p>}
        </div>
      </Link>
    );
  }

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="billboard">
      {/* RENDER MOVIES */}
      {movies.length > 0 && moviesFiltered.length === 0 ? (
        movies.map((m) => m.active && renderBillboard(m))
      ) : Array.isArray(moviesFiltered) && moviesFiltered.length > 0 ? (
        moviesFiltered.map((m) => renderBillboard(m))
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    moviesFiltered: state.moviesFiltered,
  };
};

export default connect(mapStateToProps, { getMovies })(Billboard);
