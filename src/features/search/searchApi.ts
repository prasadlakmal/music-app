import type { SearchQueryParams, SearchResponse } from './types';

const ITUNES_URL = 'https://itunes.apple.com';
const MEDIA_TYPE = 'music';

export async function fetchSearchResult({ term, limit }: SearchQueryParams) {
  const response = await fetch(
    `${ITUNES_URL}/search?term=${term}&media=${MEDIA_TYPE}&limit=${limit}`
  );
  const result = (await response.json()) as Promise<SearchResponse>;
  return result;
}
