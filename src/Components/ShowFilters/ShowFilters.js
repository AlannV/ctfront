import { useSelector } from 'react-redux';

import "./ShowFilters.css";

export default function ShowFilters({ filters, setFilters}) {

  const moviesFiltered = useSelector(state => state.moviesFiltered);

  return (
    <>
        {(filters.title !== 'default' || filters.genre !== 'default' || filters.comingSoon !== 'default' || filters.display !== 'default' ) && (
            <div className="show--filters--container">
              {(filters.title !== "default" && filters.title !== '') && (
                <div className="show--filters">
                  <p className="show--filters--title">{filters.title.toUpperCase()}</p>
                  <button
                    className="show--filters--button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        title: 'default'
                      })
                    }
                  >
                    DELETE
                  </button>
                </div>
                )}
              {filters.genre !== "default" && (
                <div className="show--filters">
                  <p className="show--filters--title">{filters.genre.toUpperCase()}</p>
                  <button
                    className="show--filters--button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        genre: 'default'
                      })
                    }
                  >
                    DELETE
                  </button>
                </div>
                )}
              {filters.comingSoon !== "default" && (
                <div className="show--filters">
                  <p className="show--filters--title">{filters.comingSoon === 'true' ? 'COMING SOON' : 'ON DISPLAY'}</p>
                  <button
                    className="show--filters--button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        comingSoon: 'default'
                      })
                    }
                  >
                    DELETE
                  </button>
                </div>
              )}
              {filters.display !== "default" && (
                <div className="show--filters">
                  <p className="show--filters--title">{filters.display.toUpperCase()}</p>
                  <button
                    className="show--filters--button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        display: 'default'
                      })
                    }
                  >
                    DELETE
                  </button>
                </div>
              )}
              {moviesFiltered.length === 0 &&
                (filters.genre !== "default" || filters.comingSoon !== "default" || filters.title !== "default" || filters.display !== "default") && (
                  <p className='filters-error'>No movies were found with the specified criteria</p>
                )}
            </div>
        )}
    </>          
  )
}
