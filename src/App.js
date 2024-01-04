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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Logo></Logo>
        <Search></Search>
        <NumResults movies={movies}></NumResults>
      </Navbar>
      <Main>
        <Box1>
          <List movies={movies}></List>
        </Box1>
        <Box2>
          <MovieSummary watched={watched}></MovieSummary>
          <MovieList watched={watched}></MovieList>
        </Box2>
      </Main>
    </>
  );
}
