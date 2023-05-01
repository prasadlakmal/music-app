import { loadEnvConfig } from '@next/env';

import 'whatwg-fetch';
import '@testing-library/jest-dom';

loadEnvConfig(__dirname, true, { info: () => null, error: console.error });
