import { useState } from "react";
import tempWatchedData from "./tempWatchedData";
import tempMovieData from "./tempMovieData";
import Navbar from "./NavBar/Navbar";
import Logo from "./NavBar/Logo";
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
import { useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "black";

  useEffect(function () {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=43158627&s=${query}`
        );
        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Error");
        }

        setMovies(data.Search);
        data.Search.map((movie) => {
          console.log(movie);
        });
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Logo></Logo>
        <Search></Search>
        <NumResults movies={movies}></NumResults>
      </Navbar>
      <Main>
        <Box1>
          {isLoading && <Loading></Loading>}
          {!isLoading && !error && <List movies={movies}></List>}
          {error && <FetchError></FetchError>}
          {isLoading && console.log("Loading")}
          {!isLoading && !error && console.log("Movie list")}
          {error && console.log("Show error")}
        </Box1>
        <Box2>
          <MovieSummary watched={watched}></MovieSummary>
          <MovieList watched={watched}></MovieList>
        </Box2>
      </Main>
    </>
  );
}
