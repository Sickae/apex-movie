import {ApolloClient, from, HttpLink, InMemoryCache} from "@apollo/client";
import {ErrorResponse, onError} from "@apollo/client/link/error";

export type ErrorHandlerFn = (error: ErrorResponse) => void;

const getErrorLink = (errorHandler?: ErrorHandlerFn) => onError(error => {
  errorHandler?.call(this, error);
  
  if (error.graphQLErrors)
    error.graphQLErrors.forEach(({ message }) =>
      console.error(`[GraphQL error]: ${message}`)
    );

  if (error.networkError) {
    console.error(`[Network error]: ${error.networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_TMDB_GRAPHQL_API
});

const _inMemoryCache = new InMemoryCache();

export const createApolloClient = (errorHandler?: ErrorHandlerFn) => new ApolloClient({
  cache: _inMemoryCache,
  link: from([getErrorLink(errorHandler), httpLink]),
});

export default createApolloClient;