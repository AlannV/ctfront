import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as randomId } from "uuid";
import "../../Styles/AdminMovies.css";
import Loading from "../Common/Loading";

import allActions from "../../Redux/Actions";
const {
  getGenres,
  getLanguages,
  getDisplays,
  startUploadingFiles,
  createMovie,
} = allActions;

function CreateMovie() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  const languages = useSelector((state) => state.languages);
  const displays = useSelector((state) => state.displays);
  const imgCloudinary = useSelector((state) => state.productImg);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getLanguages());
    dispatch(getDisplays());
    setIsLoading(false);
  }, [dispatch]);

  const [input, setInput] = useState({
    title: "",
    genre: [],
    duration: "",
    description: "",
    teaser: "",
    display: [],
    classification: "",
    cast: [],
    director: "",
    language: [],
    poster: "",
    comingSoon: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const onFileInputChange = (e) => {
    if (e.target.files === 0) return;
    dispatch(startUploadingFiles(e.target.files));
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleRadioChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectGenres(e) {
    e.preventDefault();
    setInput({
      ...input,
      genre: [...input.genre, e.target.value],
    });
  }

  function handleSelectLanguages(e) {
    e.preventDefault();
    setInput({
      ...input,
      language: [...input.language, e.target.value],
    });
  }

  function handleSelectDisplay(e) {
    e.preventDefault();
    setInput({
      ...input,
      display: [...input.display, e.target.value],
    });
  }

  function handleDeleteGenre(el) {
    setInput({
      ...input,
      genre: input.genre.filter((gen) => gen !== el),
    });
  }

  function handleDeleteLanguage(el) {
    setInput({
      ...input,
      language: input.language.filter((lang) => lang !== el),
    });
  }

  function handleDeleteDisplay(el) {
    setInput({
      ...input,
      display: input.display.filter((disp) => disp !== el),
    });
  }

  function handleSubmit(e) {
    if (
      !input.title ||
      !input.cast ||
      !input.director ||
      !input.duration ||
      !input.teaser ||
      !input.description ||
      !input.display ||
      !input.genre ||
      !input.language ||
      !input.classification
    ) {
      return alert("Fill all information fields");
    }
    input.cast = input.cast.split(",");
    setIsLoading(true);

    input.poster = imgCloudinary;

    e.preventDefault();
    dispatch(createMovie(input));
    setIsLoading(false);
    setInput({
      title: "",
      genre: [],
      duration: "",
      description: "",
      teaser: "",
      display: [],
      classification: "",
      cast: [],
      director: "",
      writter: "",
      language: [],
      poster: "",
    });
    e.target.reset();
  }

  return (
    <div className="create-movie-main-container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="create-movie-sub-container">
          <div className="create-movie">
            <h1>Create Movie</h1>
            <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
              {/* TITLE */}
              <>
                <label
                  htmlFor="title"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Title :
                </label>
                <input
                  key="title"
                  className="admin-input"
                  type="text"
                  value={input.value}
                  name="title"
                  required
                  title="Insert the title of the movie"
                  placeholder={`Insert movie title here...`}
                  onChange={(e) => handleChange(e)}
                />
              </>
              {/* CAST */}
              <>
                <label
                  htmlFor="cast"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Cast :
                </label>
                <input
                  key="cast"
                  className="admin-input"
                  type="text"
                  value={input.value}
                  name="cast"
                  required
                  title="Insert cast names separated by commas"
                  placeholder={`Insert movie cast here...`}
                  onChange={(e) => handleChange(e)}
                />
              </>

              {/* DIRECTOR */}

              <>
                <label
                  htmlFor="director"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Director :
                </label>
                <input
                  key="director"
                  className="admin-input"
                  type="text"
                  value={input.value}
                  name="director"
                  required
                  title="Insert here the name of the director of the movie"
                  placeholder={`Insert movie director here...`}
                  onChange={(e) => handleChange(e)}
                />
              </>

              {/* DURATION */}

              <>
                <label
                  htmlFor="duration"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Duration :
                </label>
                <input
                  key="duration"
                  className="admin-input"
                  type="text"
                  value={input.value}
                  name="duration"
                  required
                  title="Insert here the duration of the movie in minutes"
                  placeholder={`Insert movie duration here...`}
                  onChange={(e) => handleChange(e)}
                />
              </>

              {/* TEASER */}

              <>
                <label
                  htmlFor="teaser"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Teaser :
                </label>
                <input
                  key="teaser"
                  className="admin-input"
                  type="text"
                  value={input.value}
                  name="teaser"
                  required
                  title="Insert here the link to the teaser of the movie"
                  placeholder={`insert movie teaser url here...`}
                  onChange={(e) => handleChange(e)}
                />
              </>

              {/* POSTER */}

              <>
                <label
                  htmlFor="poster"
                  className="admin-form-titles"
                  key={randomId}
                >
                  Poster :
                </label>
                <input
                  key="poster"
                  className="admin-input"
                  name="poster"
                  required
                  title="Insert here the link to the poster of the movie"
                  placeholder={`insert movie poster url here...`}
                  type="file"
                  value={input.image}
                  onChange={onFileInputChange}
                />
              </>

              {/* DESCRIPTION */}

              <label
                htmlFor="description"
                className="admin-form-titles"
                key={randomId}
              >
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                className="admin-textarea"
                value={input.value}
                onChange={(e) => handleChange(e)}
                rows="5"
                cols="33"
                required
                title="Insert here the description of the movie"
                placeholder="Insert description here..."
              />

              {/* DISPLAYS SELECT */}

              <>
                <label htmlFor="display" className="admin-form-titles">
                  Select one or more displays :
                </label>
                <select
                  className="admin-input"
                  onChange={(e) => handleSelectDisplay(e)}
                >
                  <option className="admin-input" key={0} value="">
                    Select
                  </option>
                  {displays !== undefined &&
                    displays.length > 0 &&
                    displays
                      .sort(function (a, b) {
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                      })
                      .map((dis) => {
                        return !input.display.includes(dis) ? (
                          <option className="admin-input" key={dis} value={dis}>
                            {dis}
                          </option>
                        ) : null;
                      })}
                </select>
                <div>
                  <ul>
                    {input.display.map((el) => (
                      <div className="admin-select-selected" key={el}>
                        <li
                          onClick={() => handleDeleteDisplay(el)}
                          className="admin-selected-options"
                        >
                          {el}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </>

              {/* GENRES SELECT */}

              <>
                <label htmlFor="genre" className="admin-form-titles">
                  Select one or more genres :
                </label>
                <select
                  className="admin-input"
                  onChange={(e) => handleSelectGenres(e)}
                >
                  <option className="admin-input" key={0} value="">
                    Select
                  </option>

                  {genres !== undefined &&
                    genres.length > 0 &&
                    genres
                      .sort(function (a, b) {
                        if (a < b) return -1;
                        if (a > b) return 1;
                        return 0;
                      })
                      .map((gen) => {
                        return !input.genre.includes(gen) ? (
                          <option className="admin-input" key={gen} value={gen}>
                            {gen}
                          </option>
                        ) : null;
                      })}
                </select>

                <div>
                  <ul>
                    {input.genre?.map((el) => (
                      <div className="admin-select-selected" key={el}>
                        <li
                          onClick={() => handleDeleteGenre(el)}
                          className="admin-selected-options"
                        >
                          {el}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </>

              {/* LANGUAGES SELECT */}

              <>
                <>
                  <label htmlFor="languages" className="admin-form-titles">
                    Select one or more languages :
                  </label>
                  <select
                    className="admin-input"
                    onChange={(e) => handleSelectLanguages(e)}
                  >
                    <option className="admin-input" key={0} value="">
                      Select
                    </option>

                    {languages !== undefined &&
                      languages.length > 0 &&
                      languages
                        .sort(function (a, b) {
                          if (a < b) return -1;
                          if (a > b) return 1;
                          return 0;
                        })
                        .map((lang) => {
                          return !input.language.includes(lang) ? (
                            <option
                              className="admin-input"
                              key={lang}
                              value={lang}
                            >
                              {lang}
                            </option>
                          ) : null;
                        })}
                  </select>
                  <div>
                    <ul>
                      {input.language.map((el) => (
                        <div className="admin-select-selected" key={el}>
                          <li
                            onClick={() => handleDeleteLanguage(el)}
                            className="admin-selected-options"
                          >
                            {el}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </>
              </>
              {/* COMING SOON RADIO */}
              <>
                <label htmlFor="comingSoon" className="admin-form-titles">
                  Is a premiere?
                </label>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="true"
                    name="comingSoon"
                    id="true"
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="true" className="admin-radio-text">
                    Yes
                  </label>
                </div>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="false"
                    name="comingSoon"
                    id="false"
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="false" className="admin-radio-text">
                    No
                  </label>
                </div>
              </>
              {/* CLASSIFICATION RADIO */}
              <>
                <label htmlFor="classification" className="admin-form-titles">
                  Classification :
                </label>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="G"
                    name="classification"
                    id="G"
                    title="All ages admitted. Nothing that would
                    offend parents for viewing by children."
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="G" className="admin-radio-text">
                    G - General Audiences
                  </label>
                </div>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="PG"
                    name="classification"
                    id="PG"
                    title="Some material may not be
                    suitable for children."
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="PG" className="admin-radio-text">
                    PG – Parental Guidance Suggested
                  </label>
                </div>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="PG-13"
                    name="classification"
                    id="PG-13"
                    title="Some material may be
                    inappropriate for children under 13"
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="PG13" className="admin-radio-text">
                    PG-13 – Parents Strongly Cautioned
                  </label>
                </div>
                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="R"
                    name="classification"
                    id="R"
                    title="Under 17 requires accompanying parent or
                    adult guardian"
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="R" className="admin-radio-text">
                    R – Restricted
                  </label>
                </div>

                <div className="create-movie-radio-container">
                  <input
                    type="radio"
                    value="NC-17"
                    name="classification"
                    id="NC-17"
                    title="No One 17 and Under Admitted"
                    className="admin-radio"
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor="NC-17" className="admin-radio-text">
                    NC-17 – Adults Only
                  </label>
                </div>
              </>
              <div className="admin-buttons-container">
                <div className="another-container">
                  <button className="admin-buttons" type="submit">
                    Create Movie
                  </button>
                  <button className="admin-buttons" type="reset">
                    Clear Fields
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <Link to="/adminmenu">
        <button className="admin-buttons">Go Back</button>
      </Link>
    </div>
  );
}

export default CreateMovie;
