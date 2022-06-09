import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_QUERY} from "../graphQL/queries";
import {Box, CircularProgress} from "@mui/material";
import {IMovieCardProps, MovieCard} from "./MovieCard";

export const MovieList = (props: IMovieListProps) => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const query = useQuery(SEARCH_MOVIES_QUERY, {
    variables: {
      query: props.search,
    }
  });

  useEffect(() => {
    setMovieList(query.data?.searchMovies ?? []);
    setIsLoading(query.loading);
  }, [query]);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='1rem'>
      {isLoading
        ? <CircularProgress />
        : movieList.map((x: IMovieCardProps) => (<MovieCard key={x.id} {...x} />))
      }
    </Box>
  )
}

export interface IMovieListProps {
  search: string;
}