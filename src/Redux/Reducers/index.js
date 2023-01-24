import {
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  GET_MOVIE_NAME,
  DEL_MOVIE_DETAIL,
  DEL_MOVIES_FILTERED,
  FILTER_MOVIES,
  COMING_SOON,
  GET_ALL_SCHEDULE,
  GET_SCHEDULE_BY_MOVIE,
  GET_SCHEDULE_BY_ID,
  GET_ALL_PURCHASES,
  FILTER_BY_STATUS,
  FILTER_BY_MAIL,
  GET_ALL_MOVIES,
  GET_GENRES,
  GET_LANGUAGES,
  GET_DISPLAYS,
  RESET_SEARCH,
  GET_PRODUCTS,
  GET_ALL_USERS,
  GET_SEATS,
  GET_SCHEDULES,
  RESET_SCHEDULE_BY_MOVIE,
  GET_CLOUDINARY_IMG,
  GET_REVIEWS,
  GET_ROOMS,
  DEL_SCHEDULE,
  GET_HISTORY_BY_EMAIL,
  GET_INACTIVE_USERS,
  GET_ACTIVE_USERS,
  FAV_MOVIES,
} from "../action-types/index";

const initialState = {
  movies: [],
  movieDetail: {},
  moviesFiltered: [],
  comingSoon: [],
  schedule: [],
  scheduleById: [],
  scheduleByMovie: [],
  movieReviews: [],
  favMovies: [],
  historyByEmail: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      let activeMovies = action.payload.filter((m) => m.active);
      return {
        ...state,
        movies: activeMovies,
      };
    case GET_MOVIE_NAME:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case DEL_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: {},
      };
    case DEL_MOVIES_FILTERED:
      return {
        ...state,
        moviesFiltered: [],
      };
    case FILTER_MOVIES:
      let moviesByFilter = [];
      let count = 0;
      for (const key in action.payload) {
        if (action.payload[key] !== "default") {
          if (moviesByFilter.length === 0 && count === 0) {
            count = count + 1;
            moviesByFilter = state.movies.filter((m) => {
              return m[key]
                .toString()
                .toLowerCase()
                .includes(action.payload[key].toLowerCase());
            });
          } else {
            moviesByFilter = moviesByFilter.filter((m) => {
              return m[key]
                .toString()
                .toLowerCase()
                .includes(action.payload[key].toLowerCase());
            });
          }
        }
      }
      return {
        ...state,
        moviesFiltered: moviesByFilter,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      };
    case GET_DISPLAYS:
      return {
        ...state,
        displays: action.payload,
      };
    case GET_ALL_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        movie: [],
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_INACTIVE_USERS:
      return {
        ...state,
        inactiveUsers: action.payload,
      };
    case GET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload,
      };

    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case GET_SEATS:
      return {
        ...state,
        seats: action.payload,
      };
    case COMING_SOON:
      let soon = [...state.movies.filter((m) => m.comingSoon === true)];
      return {
        ...state,
        comingSoon: soon,
      };
    case GET_SCHEDULES:
      return {
        ...state,
        allSchedules: action.payload,
      };

    case GET_ALL_SCHEDULE:
      let ordtime = action.payload.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
      let ordday = ordtime.sort((a, b) => {
        if (a.day < b.day) return -1;
        if (a.day > b.day) return 1;
        return 0;
      });
      let scheduled2 = ordday.filter((m) => m.active === true);
      return {
        ...state,
        schedule: scheduled2,
      };

    case GET_SCHEDULE_BY_ID:
      let schedule = action.payload.active ? action.payload : [];
      return {
        ...state,
        scheduleById: schedule,
      };

    case GET_SCHEDULE_BY_MOVIE:
      let otime = action.payload.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });
      let oday = otime.sort((a, b) => {
        if (a.day < b.day) return -1;
        if (a.day > b.day) return 1;
        return 0;
      });
      let scheduled = oday.filter((m) => m.active === true);

      return {
        ...state,
        scheduleByMovie: scheduled,
      };

    case RESET_SCHEDULE_BY_MOVIE:
      return {
        ...state,
        scheduleByMovie: [],
      };

    case DEL_SCHEDULE:
      return {
        ...state,
        scheduleById: [],
      };

    case GET_REVIEWS:
      return {
        ...state,
        movieReviews: action.payload,
      };
    //!---------------------------
    case FAV_MOVIES:
      return {
        ...state,
        favMovies: action.payload,
      };
    //!---------------------------
    case GET_HISTORY_BY_EMAIL:
      return {
        ...state,
        historyByEmail: action.payload,
      };
    case GET_CLOUDINARY_IMG:
      return {
        ...state,
        productImg: action.payload,
      };
    case GET_ALL_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };

    case FILTER_BY_STATUS:
      const purchasesFiltered = [...state.historyByEmail];
      const filtered = purchasesFiltered.filter((el) => {
        return el.status?.includes(action.payload);
      });
      return {
        ...state,
        purchases: filtered,
      };

    case FILTER_BY_MAIL:
      const purchasesFiltered2 = [...state.historyByEmail];
      const filtered2 = purchasesFiltered2.filter((el) => {
        return el.User.email?.includes(action.payload);
      });
      return {
        ...state,
        purchases: filtered2,
      };

    default:
      return {
        ...state,
      };
  }
}
