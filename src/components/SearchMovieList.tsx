import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_QUERY} from "../graphQL/queries";
import {Box, CircularProgress} from "@mui/material";
import {IMovieCardProps, MovieCard} from "./MovieCard";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const SearchMovieList = (props: IMovieListProps) => {
  const params = useParams();
  const query = useQuery(SEARCH_MOVIES_QUERY, {
    variables: {
      query: params.search,
    }
  });
  
  useEffect(() => {
    if (query.data && !query.loading) {
      props.onLoad();
    }
  }, [query, props]);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='1rem'>
      {query.loading
        ? <CircularProgress />
        : query.data?.searchMovies?.map((x: IMovieCardProps) => (<MovieCard key={x.id} {...x} />))
      }
    </Box>
  )
}

export type OnMovieListLoadFn = () => void;

export interface IMovieListProps {
  onLoad: OnMovieListLoadFn;
}