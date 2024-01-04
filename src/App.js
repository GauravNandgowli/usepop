import { useState } from "react";
import tempWatchedData from "./tempWatchedData";
import Navbar from "./NavBar/Navbar";
import Search from "./NavBar/Search";
import NumResults from "./NavBar/NumResults";
import Main from "./Main/Main";
import Box1 from "./Main/Box1";
import Box2 from "./Main/Box2";
import List from "./Main/List";
import MovieList from "./Main/MovieList";
import MovieSummary from "./Main/MovieSummary";
import Loading from "./Handler/Loading";
import FetchError from "./Handler/FetchError";
import SelectedMovie from "./Handler/SelectedMovie";

import { useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("  ");
  const [selectedId, SetId] = useState(null);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=43158627&s=${query}`
          );
          const data = await response.json();
          if (data.Response === "False") {
            throw new Error("Error");
          }
          setMovies(data.Search);
          console.log(data.Search);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults movies={movies}></NumResults>
      </Navbar>
      <Main>
        <Box1>
          {isLoading && <Loading></Loading>}
          {!isLoading && !error && (
            <List movies={movies} selectedId={selectedId} SetId={SetId}></List>
          )}
          {error && <FetchError></FetchError>}
        </Box1>
        <Box2>
          {selectedId ? (
            <SelectedMovie SelectedMovieId={selectedId}></SelectedMovie>
          ) : (
            <>
              <MovieSummary watched={watched}></MovieSummary>
              <MovieList watched={watched}></MovieList>
            </>
          )}
        </Box2>
      </Main>
    </>
  );
}
