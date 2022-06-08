import {Box, IconButton, TextField} from "@mui/material";
import {SearchSharp} from "@mui/icons-material";
import React, {useState} from "react";

export const MovieSearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const onInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    
    handleSearch();
  }

  const handleSearch = () => {
    console.log('searching...', searchValue);
  }
  
    return (
      <Box margin="2rem" display="flex" justifyContent="center">
        <Box width="80%">
          <TextField
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyPress={(e) => onInputKeyPress(e)}
            fullWidth={true}
            label="Search movie"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchSharp />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
    )
}
