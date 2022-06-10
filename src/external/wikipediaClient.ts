import DOMPurify from "dompurify";

const getApiUrl = () => new URL(process.env.REACT_APP_WIKIPEDIA_API as string);

const addObjectToSearchParams = (url: URL, obj: Record<string, any>) => {
  Object.keys(obj).forEach(x => {
    url.searchParams.append(x, obj[x]);
  });
}

export const WikipediaClient = {
  getExactMovieSnippet: async (title: string): Promise<string | undefined> => {
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
    
    if (jsonResponse.query?.search?.[0]?.title !== title) {
      return;
    }

    const snippet = jsonResponse.query?.search?.[0]?.snippet;
    return DOMPurify.sanitize(snippet);
  } 
}