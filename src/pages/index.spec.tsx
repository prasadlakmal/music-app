import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@utils/rtl-utils';
import { setupServer } from 'msw/node';

import { handlers } from './../common/mocks/handlers';
import SearchPage from '.';

const server = setupServer(...handlers);

describe('Search Page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('has the search bar with music icon and text input', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByTestId('LibraryMusicIcon')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: 'Search for songs, albums or artists',
      })
    ).toBeInTheDocument();
  });

  it('has the welcome message', () => {
    renderWithProviders(<SearchPage />);
    expect(
      screen.getByText('Welcome to iTunes music search!')
    ).toBeInTheDocument();
  });

  it('should not show welcome message when user perform a search', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);
    const searchInput = screen.getByRole('textbox', {
      name: 'Search for songs, albums or artists',
    });
    const welcomeMessage = screen.queryByText(
      'Welcome to iTunes music search!'
    );
    await user.click(searchInput);
    await user.keyboard('jack johnson');
    await waitFor(() => expect(welcomeMessage).not.toBeInTheDocument());
  });

  it('should show welcome message back when user backspace search input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);
    const searchInput = screen.getByRole('textbox', {
      name: 'Search for songs, albums or artists',
    });
    const welcomeMessage = screen.queryByText(
      'Welcome to iTunes music search!'
    );
    await user.click(searchInput);
    await user.keyboard('jack');
    await waitFor(() => expect(welcomeMessage).not.toBeInTheDocument());
    await user.keyboard('{Backspace}{Backspace}{Backspace}'); // removing k,c,a
    expect(welcomeMessage).not.toBeInTheDocument();
    await user.keyboard('{Backspace}'); // removing j
    // expect(welcomeMessage).toBeInTheDocument(); // for some reasons this doesn't work
    expect(
      await screen.findByText('Welcome to iTunes music search!')
    ).toBeInTheDocument();
    screen.debug();
  });
});
