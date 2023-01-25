import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FilterBy.css";

import { getGenres, getDisplays } from "../../../../Redux/Actions";

export default function FilterBy({ filters, setFilters }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const displays = useSelector((state) => state.displays);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getDisplays());
  }, [dispatch]);

  let handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="filters--select--container">
        <select
          onChange={(e) => handleChange(e)}
          name="genre"
          className="filters--select"
          value={filters.genre}
        >
          <option value="default" className="filters--option">
            Genre
          </option>
          {genres !== undefined &&
            genres.map((g, index) => (
              <option key={index} value={g} className="filters--option">
                {g}
              </option>
            ))}
        </select>
        <select
          onChange={(e) => handleChange(e)}
          name="comingSoon"
          className="filters--select"
          value={filters.comingSoon}
        >
          <option value="default" className="filters--option">
            Coming soon?
          </option>
          <option value={true} className="filters--option">
            Premiere
          </option>
          <option value={false} className="filters--option">
            On display
          </option>
        </select>

        <select
          onChange={(e) => handleChange(e)}
          name="display"
          className="filters--select"
          value={filters.display}
        >
          <option value="default" className="filters--option">
            Display
          </option>
          {displays !== undefined &&
            displays.map((d, index) => (
              <option key={index} value={d} className="filters--option">
                {d}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
