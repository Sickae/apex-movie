import React, {useState} from 'react';
import './App.scss';
import {AppBar, Box, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {MovieSearchBar} from "./components/MovieSearchBar";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "./graphQL/client";
import {MovieList} from "./components/MovieList";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const [searchValue, setSearchValue] = useState('');
  
  const searchHandler = (search: string) => {
    setSearchValue(search);
  }
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar position="relative">
        <Typography variant="h2" padding="1rem" align="center">Apex Movie</Typography>
      </AppBar>
      
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box width='66%'>
          
          <MovieSearchBar searchHandler={searchHandler} />
    
          <ApolloProvider client={apolloClient}>
            {searchValue.length > 0
              ? <MovieList search={searchValue} /> 
              : <></>
            } 
          </ApolloProvider>
        </Box>
    </Box>
        
    </ThemeProvider>
  );
}

export default App;
