import {gql} from "@apollo/client";

export const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id,
      name,
      score,
      votes,
      genres {
        name
      },
    }
  }`;

export const RELATED_MOVIES_QUERY = gql`
  query RelatedMovies($id: ID!) {
    movie(id: $id) {
      id,
      similar {
        id,
        name,
        score,
        votes,
        genres {
          name
        },
      }
    }
  }`;