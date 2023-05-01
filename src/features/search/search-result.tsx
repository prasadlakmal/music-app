import { Virtuoso } from 'react-virtuoso';
import List from '@features/search/list';
import Footer from '@features/search/list-footer';
import Item from '@features/search/list-item';

import ListItemContent from './list-item-content';
import type { Result } from './types';

type SearchResultProps = {
  data: Result[];
  endReached: (index: number) => void;
  showFooter: boolean;
};

const SearchResult = ({ data, endReached, showFooter }: SearchResultProps) => {
  return (
    <Virtuoso
      style={{ height: 750 }}
      data={data}
      endReached={endReached}
      overscan={200}
      components={{ List, Item, Footer: showFooter ? Footer : undefined }}
      itemContent={(_, { artworkUrl100, trackName, artistName, kind }) => {
        return (
          <ListItemContent
            artWorkUrl={artworkUrl100}
            trackName={trackName}
            artistName={artistName}
            kind={kind}
          />
        );
      }}
    />
  );
};

export default SearchResult;
