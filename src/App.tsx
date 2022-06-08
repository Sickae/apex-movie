import React from 'react';
import './App.scss';
import {AppBar, createTheme, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {MovieSearchBar} from "./components/MovieSearchBar";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        
      <AppBar position="relative">
        <Typography variant="h2" padding="1rem" align="center">Apex Movie</Typography>
      </AppBar>
      
      <MovieSearchBar />
        
    </ThemeProvider>
  );
}

export default App;
