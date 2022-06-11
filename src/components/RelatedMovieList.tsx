import {useQuery} from "@apollo/client";
import {RELATED_MOVIES_QUERY} from "../graphQL/queries";
import {Box, CircularProgress} from "@mui/material";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {IMovieListProps} from "./SearchMovieList";
import {IMovieCardProps, MovieCard} from "./MovieCard";

export const RelatedMovieList = (props: IMovieListProps) => {
  const params = useParams();
  const query = useQuery(RELATED_MOVIES_QUERY, {
    variables: {
      id: params.movieId,
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
        : query.data?.movie?.similar?.map((x: IMovieCardProps) => (<MovieCard key={x.id} {...x} />))
      }
    </Box>
  )
}
