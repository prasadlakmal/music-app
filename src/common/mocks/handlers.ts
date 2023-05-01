import { ITUNES_URL } from '@features/search/searchApi';
import { rest } from 'msw';

import searchMockResponse from './search-mock-response';

export const handlers = [
  rest.get(`${ITUNES_URL}/search`, (req, res, ctx) => {
    return res(ctx.json(searchMockResponse));
  }),
];
