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

  const onClickSearch = () => {
    if (props.isDisabled) {
      return;
    }

    props.searchHandler(inputValue);
  }

  return (
    <TextField
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyPress={(e) => onInputKeyPress(e)}
      disabled={props.isDisabled}
      sx={{margin: '2rem 0'}}
      fullWidth={true}
      label="Search movie"
      InputProps={{
        endAdornment: (
          <IconButton disabled={props.isDisabled} onClick={onClickSearch}>
            <SearchSharp />
          </IconButton>
        ),
      }}
    />
  )
}

export type SearchHandlerFn = (inputValue: string) => void;

export interface IMovieSearchBarProps {
  searchHandler: SearchHandlerFn;
  isDisabled: boolean;
}

