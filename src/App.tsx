import React, {useState} from 'react';
import './App.scss';
import {Alert, AppBar, Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {MovieSearchBar} from "./components/MovieSearchBar";
import {SearchMovieList} from "./components/SearchMovieList";
import createApolloClient, {ErrorHandlerFn} from "./graphQL/client";
import {ApolloProvider} from "@apollo/client";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {RelatedMovieList} from "./components/RelatedMovieList";
import {LandingPage} from "./components/LandingPage";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [errorMsg, setErrorMsg] = useState<string>();
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const navigate = useNavigate();

  const errorHandler: ErrorHandlerFn = (() => {
    setErrorMsg('Cannot load movies. Please try again later.');
    setIsSearchDisabled(false);
  });

  const apolloClient = createApolloClient(errorHandler);

  const handleSearch = (search: string) => {
    if (search.length > 0) {
      setErrorMsg('');
      setIsSearchDisabled(true);
      navigate(`/search/${search}`);
    }
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar position="relative">
        <Typography variant="h2" padding="1rem" align="center">Apex Movie</Typography>
      </AppBar>

      <Container maxWidth='xl'>

        <MovieSearchBar searchHandler={handleSearch} isDisabled={isSearchDisabled} />

        <ApolloProvider client={apolloClient}>
          {errorMsg &&
            <Alert color='error'>
              {errorMsg}
            </Alert>
          }

          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/search/:search' element={<SearchMovieList onLoad={() => setIsSearchDisabled(false)} />} />
            <Route path='/related/:movieId' element={<RelatedMovieList onLoad={() => setIsSearchDisabled(false)} />} />
          </Routes>
        </ApolloProvider>


      </Container>

    </ThemeProvider>
  );
}

export default App;
