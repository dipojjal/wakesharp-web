import { handleSupport } from './_lib/support.js';
export const POST = (request: Request): Promise<Response> => handleSupport(request);
export const GET = (request: Request): Promise<Response> => handleSupport(request);
