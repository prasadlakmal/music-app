const ITUNES_URL = 'https://itunes.applee.com';
const MEDIA_TYPE = 'music';

export interface SearchQueryParams {
  term: string;
  limit: number;
}

interface Result {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  isStreamable: boolean;
}

export interface SearchResponse {
  resultCount: number;
  results: Result[];
}

export async function fetchSearchResult({ term, limit }: SearchQueryParams) {
  const response = await fetch(
    `${ITUNES_URL}/search?term=${term}&media=${MEDIA_TYPE}&limit=${limit}`
  );
  const result = (await response.json()) as Promise<SearchResponse>;
  return result;
}
