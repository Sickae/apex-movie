import {IconButton, TextField} from "@mui/material";
import {SearchSharp} from "@mui/icons-material";
import React, {useState} from "react";

export const MovieSearchBar = (props: IMovieSearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  
  
  const onInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    props.searchHandler(inputValue);
  }
  
    return (
      <TextField
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyPress={(e) => onInputKeyPress(e)}
        sx={{margin: '2rem 0'}}
        fullWidth={true}
        label="Search movie"
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => props.searchHandler(inputValue)}>
              <SearchSharp />
            </IconButton>
          ),
        }}
      />
    )
}

export interface IMovieSearchBarProps {
  searchHandler: (inputValue: string) => void;
}
