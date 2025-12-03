import { toNextJsHandler } from 'better-auth/next-js';

import { auth } from '@repo/auth/auth.config';

export const { GET, POST } = toNextJsHandler(auth.handler);

export const runtime = "nodejs";
