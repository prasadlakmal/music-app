import { renderWithProviders } from '@utils/rtl-utils';

import SearchPage from '.';

describe('Search Page', () => {
  it('has the search bar', () => {
    renderWithProviders(<SearchPage />);
  });
});
