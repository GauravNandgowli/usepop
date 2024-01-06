import { useEffect } from "react";
import { useState } from "react";
import StartRating from "../StarRating";
import Loading from "./Loading";

function SelectedMovie({ SelectedMovieId, SetId, watched, setWatched }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [userRatings, setUserRatings] = useState("");
  const isAlreadyWatched = watched
    .map((movie) => movie.imdbID)
    .includes(SelectedMovieId);

  // const isWatched = watched.map((movie) => console.log(movie));
  // console.log(watched);
  // console.log(isWatched);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetail;

  function handleClose() {
    SetId(null);
  }
  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    handleClose();
  }

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: SelectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleWatched(newWatchedMovie);
  }

  useEffect(() => {
    async function movieDetails() {
      setLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=43158627&i=${SelectedMovieId}`
      );

      const data = await response.json();
      // console.log(data);
      setMovieDetail(data);
      setLoading(false);
    }
    movieDetails();
  }, [SelectedMovieId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movieDetail} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isAlreadyWatched ? (
                <p>Added to list Already</p>
              ) : (
                <>
                  <StartRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRatings}
                  ></StartRating>
                  {userRatings > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list{" "}
                    </button>
                  )}{" "}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
