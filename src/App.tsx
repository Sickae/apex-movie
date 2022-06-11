import React, {useState} from 'react';
import './App.scss';
import {Alert, AppBar, Container, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {MovieSearchBar} from "./components/MovieSearchBar";
import {MovieList} from "./components/MovieList";
import createApolloClient, {ErrorHandlerFn} from "./graphQL/client";
import {ApolloProvider} from "@apollo/client";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [errorMsg, setErrorMsg] = useState<string>();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);

  const errorHandler: ErrorHandlerFn = (() => {
    setErrorMsg('Cannot load movies. Please try again later.');
  });
  
  const apolloClient = createApolloClient(errorHandler);
  
  const handleSearch = (search: string) => {
    if (search.length > 0) {
      setIsSearchDisabled(true);
    }
    setSearchValue(search);
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
          
          {!errorMsg && searchValue.length > 0 &&
            <MovieList search={searchValue} onLoad={() => setIsSearchDisabled(false)} /> 
          }
        </ApolloProvider>


      </Container>
        
    </ThemeProvider>
  );
}

export default App;
