import DOMPurify from "dompurify";

const getApiUrl = () => new URL(process.env.REACT_APP_WIKIPEDIA_API as string);

const addObjectToSearchParams = (url: URL, obj: Record<string, any>) => {
  Object.keys(obj).forEach(x => {
    url.searchParams.append(x, obj[x]);
  });
}

export const WikipediaClient = {
  getExactMovieDetails: async (title: string, onError?: (error: unknown) => void): Promise<IWikiMovieDetails | undefined> => {
    try {
      const url = getApiUrl();
      addObjectToSearchParams(url, {
        action: 'query',
        format: 'json',
        prop: 'categories',
        list: 'search',
        clcategories: 'movie',
        srsearch: `"${title}"`,
        srlimit: 1,
        srprop: 'snippet',
        origin: '*'
      });
      
      const response = await fetch(url);
      const jsonResponse = await response.json();
      
      const mostRelevantResult = jsonResponse.query?.search?.[0];
      if (mostRelevantResult?.title !== title) {
        return {
          htmlSnippet: 'Cannot find a Wikipedia page for this movie.',
        };
      }

      const htmlSnippet = DOMPurify.sanitize(mostRelevantResult.snippet);
      const wikiPageLink = `https://en.wikipedia.org/?curid=${mostRelevantResult.pageid}`
      
      return {
        htmlSnippet: `${htmlSnippet}...`,
        wikiPageLink,
      }
    }
    catch (error) {
      onError?.call(this, error);
    }
    
    return;
  } 
}

export interface IWikiMovieDetails {
  htmlSnippet: string;
  wikiPageLink?: string;
}
